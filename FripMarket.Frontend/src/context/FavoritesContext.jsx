import { createContext, useContext, useMemo, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "fripmarket_favorites";

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites);
  const toggleFavorite = (id) => setFavorites((current) => {
    const next = current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  });
  const value = useMemo(() => ({ favorites, toggleFavorite }), [favorites]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites doit être utilisé dans FavoritesProvider.");
  return context;
}
