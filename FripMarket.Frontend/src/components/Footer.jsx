import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div><Link className="logo" to="/">FripMarket</Link><p>La marketplace de seconde main en Tunisie.</p></div>
        <div>Aide · Livraison · Retours · CGU · Contact</div>
      </div>
    </footer>
  );
}
