import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { CATS } from "../data/mockProducts.js";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const { isAuthenticated, hasRole, user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "Tout";
  const search = (event) => {
    event.preventDefault();
    navigate(`/catalog${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };
  const categoryLink = (category) => `/catalog?category=${encodeURIComponent(category)}`;
  const name = user?.firstName || user?.given_name || user?.email || "Mon compte";
  return (
    <header className="nav">
      <div className="wrap">
        <div className="nav-top">
          <Link className="logo" to="/">Frip<b>Market</b></Link>
          <form className="search" role="search" onSubmit={search}>
            <input aria-label="Rechercher un article" placeholder="Rechercher une veste, une marque…" value={query} onChange={(event) => setQuery(event.target.value)} />
            <button type="submit">Rechercher</button>
          </form>
          <div className="icons">
            <Link className="ibtn" title="Favoris" aria-label="Mes favoris" to="/catalog?favorites=true">🤍</Link>
            <Link className="ibtn" title="Panier" aria-label={`Panier${items.length ? `, ${items.length} article(s)` : ""}`} to="/cart">🛒{items.length > 0 && <span className="badge">{items.length}</span>}</Link>
            {isAuthenticated ? (
              <details className="account-menu">
                <summary className="ibtn" aria-label={`Menu du compte ${name}`}><span className="av">{String(name)[0]?.toUpperCase()}</span></summary>
                <div className="account-dropdown">
                  <strong>{name}</strong>
                  <Link to="/profile">Mon profil</Link><Link to="/orders">Mes commandes</Link><Link to="/catalog?favorites=true">Mes favoris</Link>
                  {hasRole("Seller") && <Link to="/seller">Espace vendeur</Link>}
                  {hasRole("Admin") && <Link to="/admin">Administration</Link>}
                  <button type="button" onClick={() => { logout(); navigate("/"); }}>Se déconnecter</button>
                </div>
              </details>
            ) : <><Link className="btn out sm" to="/login">Se connecter</Link><Link className="btn sm" to="/register">S'inscrire</Link></>}
          </div>
        </div>
        <nav className="cats" aria-label="Catégories">
          {CATS.map((category) => <NavLink key={category} to={categoryLink(category)} className={() => `category-link${location.pathname === "/catalog" && selectedCategory === category ? " on" : ""}`}>{category}</NavLink>)}
        </nav>
      </div>
    </header>
  );
}
