import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService.js";
import { TOKEN_KEY } from "../services/api.js";

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(window.atob(payload))));
  } catch {
    return {};
  }
}

function userFromToken(token, responseUser) {
  const claims = decodeToken(token);
  const roleClaim = claims.role || claims.roles || claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || responseUser?.roles || responseUser?.role;
  const roles = Array.isArray(roleClaim) ? roleClaim : roleClaim ? [roleClaim] : [];
  return { ...claims, ...responseUser, roles };
}

function initialSession() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { token, user: userFromToken(token, null) } : { token: null, user: null };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(initialSession);
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setSession({ token: null, user: null });
  }, []);

  useEffect(() => {
    window.addEventListener("fripmarket:unauthorized", logout);
    return () => window.removeEventListener("fripmarket:unauthorized", logout);
  }, [logout]);

  const saveSession = useCallback((response) => {
    const token = response.token || response.accessToken || response.access_token;
    if (!token) return null;
    localStorage.setItem(TOKEN_KEY, token);
    const user = userFromToken(token, response.user || null);
    setSession({ token, user });
    return user;
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await authService.login(credentials);
    const user = saveSession(response);
    if (!user) throw new Error("La réponse du serveur ne contient pas de jeton d'accès.");
    return { ...response, user };
  }, [saveSession]);

  const register = useCallback(async (details) => {
    const response = await authService.register(details);
    const user = saveSession(response);
    return { ...response, user: user || response.user, authenticated: Boolean(user) };
  }, [saveSession]);

  const hasRole = useCallback((role) => session.user?.roles?.some((userRole) => userRole.toLowerCase() === role.toLowerCase()) || false, [session.user]);
  const value = useMemo(() => ({
    user: session.user,
    token: session.token,
    login,
    register,
    logout,
    isAuthenticated: Boolean(session.token),
    hasRole,
  }), [session, login, register, logout, hasRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider.");
  return context;
}
