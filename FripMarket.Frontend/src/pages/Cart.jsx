import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import { useCart } from "../context/CartContext.jsx";
import { orderService } from "../services/orderService.js";
import formatPrice from "../utils/formatPrice.js";

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("flouci");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const subtotal = items.reduce((sum, product) => sum + product.p, 0);
  const sellers = new Set(items.map((product) => product.seller)).size;
  const shipping = sellers * 7;

  const checkout = async () => {
    setError("");
    setLoading(true);
    try {
      await orderService.checkout({ productIds: items.map((item) => item.id), paymentMethod });
      clearCart();
      setCompleted(true);
    } catch {
      setError("Impossible de confirmer la commande pour le moment. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (completed) return <div className="wrap not-found"><div style={{ fontSize: 80 }}>🎉</div><h1>Commande confirmée !</h1><p>Merci pour votre achat. Retrouvez votre facture dans « Mes commandes ».</p><Link className="btn" to="/">Retour à l'accueil</Link></div>;
  return (
    <div className="wrap layout cart-layout">
      <section className="panel">
        <h2>Mon panier ({items.length})</h2>
        {items.map((product) => (
          <div className="row" key={product.id}>
            <div className="pic" style={{ background: product.tint }}>{product.e}</div>
            <div className="grow"><b>{product.t}</b><br /><small>Vendeur : {product.seller}</small></div>
            <b>{formatPrice(product.p)}</b>
            <Button variant="outline" className="sm" aria-label={`Retirer ${product.t} du panier`} onClick={() => removeItem(product.id)}>✕</Button>
          </div>
        ))}
        {!items.length && <p>Votre panier est vide. <Link to="/catalog">Découvrir le catalogue</Link></p>}
      </section>
      <aside className="panel sum">
        <h3>Récapitulatif</h3>
        <div><span>Articles</span><span>{formatPrice(subtotal)}</span></div>
        <div><span>Livraison ({sellers} colis)</span><span>{formatPrice(shipping)}</span></div>
        <div className="tot"><span>Total</span><span>{formatPrice(subtotal + shipping)}</span></div>
        <h4>Paiement</h4>
        {[["flouci", "💳 Payer en ligne avec Flouci"], ["cod", "💵 Paiement à la livraison"]].map(([value, label]) => (
          <label key={value} className={`opt${paymentMethod === value ? " on" : ""}`}>
            <input type="radio" name="payment" value={value} checked={paymentMethod === value} onChange={() => setPaymentMethod(value)} />{label}
          </label>
        ))}
        <Alert>{error}</Alert>
        <Button variant="secondary" style={{ width: "100%" }} disabled={!items.length} loading={loading} onClick={checkout}>Confirmer la commande</Button>
      </aside>
    </div>
  );
}
