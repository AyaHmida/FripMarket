import { Link } from "react-router-dom";
import CategoryTiles from "../components/CategoryTiles.jsx";
import ProductCard from "../components/ProductCard.jsx";
import TrustBar from "../components/TrustBar.jsx";
import { PRODUCTS } from "../data/mockProducts.js";

export default function Home() {
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <h1>Donnez une seconde vie à votre dressing</h1>
          <p>Achetez et vendez des vêtements de seconde main entre particuliers, en toute confiance, partout en Tunisie.</p>
          <Link className="btn" to="/catalog">Explorer le catalogue</Link>{" "}
          <Link className="btn out" to="/seller">Vendre un article</Link>
        </div>
        <div className="hero-art" aria-hidden="true">🛍️</div>
      </section>
      <section className="sec">
        <div className="sec-h"><h2>Nos rayons</h2></div>
        <CategoryTiles />
      </section>
      <section className="sec">
        <div className="sec-h"><h2>Nouveautés</h2><Link to="/catalog">Tout voir →</Link></div>
        <div className="grid">{PRODUCTS.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
      <TrustBar />
    </div>
  );
}
