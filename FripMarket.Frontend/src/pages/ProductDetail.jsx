import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";
import { useCart } from "../context/CartContext.jsx";
import { productService } from "../services/productService.js";
import formatPrice from "../utils/formatPrice.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(undefined);
  const { items, addItem } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    Promise.resolve(productService.getById(id)).then((result) => { if (active) setProduct(result); });
    return () => { active = false; };
  }, [id]);

  if (product === undefined) return <Loader />;
  if (!product) return <div className="wrap not-found"><h1>Article introuvable</h1><Link className="btn" to="/catalog">Retour au catalogue</Link></div>;
  const inCart = items.some((item) => item.id === product.id);
  return (
    <div className="wrap detail">
      <div className="gal">
        <div className="pic" style={{ background: product.tint }}>{product.e}</div>
        <div className="thumbs">{[0, 1, 2].map((index) => <div key={index} style={{ background: product.tint }}>{product.e}</div>)}</div>
      </div>
      <div>
        <span className="chip on">Disponible</span>
        <h1 style={{ marginTop: 10 }}>{product.t}</h1>
        <div className="big">{formatPrice(product.p)}</div>
        <div className="meta"><div><small>Marque</small>{product.b}</div><div><small>Taille</small>{product.s}</div><div><small>État</small>{product.c}</div><div><small>Catégorie</small>{product.cat}</div></div>
        <p style={{ color: "var(--mute)" }}>Pièce unique en excellent état, soigneusement entretenue. Photos non contractuelles dans ce template.</p>
        <div className="seller"><div className="av">{product.seller[0]}</div><div className="grow"><b>{product.seller}</b><br /><small>★ 4,8 · 32 ventes</small></div><Button variant="outline" className="sm">Voir le dressing</Button></div>
        <Button disabled={inCart} onClick={() => { addItem(product); navigate("/cart"); }}>{inCart ? "Déjà dans le panier" : "Ajouter au panier"}</Button>
      </div>
    </div>
  );
}
