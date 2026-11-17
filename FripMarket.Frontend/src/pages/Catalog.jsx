import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Chip from "../components/Chip.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { CATS } from "../data/mockProducts.js";
import { productService } from "../services/productService.js";

export default function Catalog() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const initialCategory = params.get("category") || "Tout";
  const [category, setCategory] = useState(initialCategory);
  const showFavorites = params.get("favorites") === "true";
  const { favorites } = useFavorites();
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState("new");
  const [condition, setCondition] = useState("Tous");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let active = true;
    productService.getAll()
      .then((result) => { if (active) setProducts(result); })
      .catch(() => { if (active) setLoadError("Impossible de charger le catalogue pour le moment."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => setCategory(initialCategory), [initialCategory]);
  const list = useMemo(() => {
    let result = products.filter((product) =>
      (!showFavorites || favorites.includes(product.id)) &&
      (category === "Tout" || product.cat === category) &&
      product.p <= maxPrice &&
      (condition === "Tous" || product.c === condition) &&
      `${product.t} ${product.b}`.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === "asc") result = [...result].sort((a, b) => a.p - b.p);
    if (sort === "desc") result = [...result].sort((a, b) => b.p - a.p);
    return result;
  }, [products, category, maxPrice, sort, condition, query, showFavorites, favorites]);

  return (
    <div className="wrap layout">
      <aside className="panel" aria-label="Filtres du catalogue">
        <h4>Catégorie</h4>
        <div className="chips">{CATS.map((item) => <Chip key={item} active={category === item} onClick={() => setCategory(item)}>{item}</Chip>)}</div>
        <h4>État</h4>
        <div className="chips">{["Tous", "Comme neuf", "Très bon", "Bon"].map((item) => <Chip key={item} active={condition === item} onClick={() => setCondition(item)}>{item}</Chip>)}</div>
        <label htmlFor="max-price"><h4>Prix max : {maxPrice} TND</h4></label>
        <input id="max-price" type="range" min="10" max="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} style={{ width: "100%" }} />
      </aside>
      <section aria-label="Résultats du catalogue">
        <div className="sec-h">
          <h2>{showFavorites ? "Mes favoris" : `${list.length} articles`}</h2>
          <select className="sel" aria-label="Trier les articles" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="new">Nouveautés</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option>
          </select>
        </div>
        {loading ? <p role="status">Chargement du catalogue…</p> : loadError ? <p role="alert">{loadError}</p> : <div className="grid">{list.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
        {!loading && !loadError && !list.length && <p>Aucun article ne correspond à votre recherche.</p>}
      </section>
    </div>
  );
}
