import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getApiError } from "../utils/apiError.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!EMAIL_PATTERN.test(values.email.trim())) nextErrors.email = "Saisissez une adresse e-mail valide.";
    if (!values.password) nextErrors.password = "Le mot de passe est obligatoire.";
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const response = await login({ email: values.email.trim(), password: values.password, rememberMe: values.rememberMe });
      const returnTo = location.state?.from;
      const roles = response.user?.roles || [];
      navigate(returnTo ? `${returnTo.pathname || "/"}${returnTo.search || ""}${returnTo.hash || ""}` : roles.some((role) => role.toLowerCase() === "admin") ? "/admin" : roles.some((role) => role.toLowerCase() === "seller") ? "/seller" : "/", { replace: true });
    } catch (error) {
      setServerError(getApiError(error, "Connexion impossible. Vérifiez vos identifiants et réessayez."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-card">
      <h2>Bon retour !</h2><p className="auth-subtitle">Connectez-vous pour retrouver votre dressing préféré.</p>
      <form className="auth-form" onSubmit={submit} noValidate>
        <Alert>{serverError}</Alert>
        <Input label="E-mail" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(event) => setValues({ ...values, email: event.target.value })} />
        <Input label="Mot de passe" type="password" autoComplete="current-password" value={values.password} error={errors.password} onChange={(event) => setValues({ ...values, password: event.target.value })} />
        <div className="auth-options">
          <label className="check-line"><input type="checkbox" checked={values.rememberMe} onChange={(event) => setValues({ ...values, rememberMe: event.target.checked })} />Se souvenir de moi</label>
          <Link className="auth-link" to="/forgot-password">Mot de passe oublié ?</Link>
        </div>
        <Button type="submit" loading={loading}>Se connecter</Button>
      </form>
      <p className="auth-foot">Pas encore de compte ? <Link className="auth-link" to="/register">Créer un compte</Link></p>
    </section>
  );
}
