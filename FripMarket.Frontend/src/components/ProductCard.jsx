import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import formatPrice from "../utils/formatPrice.js";

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useFavorites();
  const favorite = favorites.includes(product.id);
  return (
    <article className="card">
      <Link to={`/product/${product.id}`} aria-label={`Voir ${product.t}`} style={{ color: "inherit", textDecoration: "none" }}>
        <div className="pic" style={{ background: product.tint }}>
          {product.e}<span className="tag">{product.c}</span>
        </div>
        <div className="info"><small>{product.b} · Taille {product.s}</small><h3>{product.t}</h3><div className="price">{formatPrice(product.p)}</div></div>
      </Link>
      <button className="fav" type="button" aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"} aria-pressed={favorite} onClick={() => toggleFavorite(product.id)}>
        {favorite ? "❤️" : "🤍"}
      </button>
    </article>
  );
}
