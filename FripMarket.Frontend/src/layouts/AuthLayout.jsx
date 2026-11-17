import { Link, Outlet } from "react-router-dom";
import "../styles/auth.css";

export default function AuthLayout() {
  return (
    <main className="auth-page">
      <section className="auth-art">
        <Link className="logo" to="/">FripMarket</Link>
        <div className="auth-art-copy">
          <h1>Donnez une seconde vie à votre dressing</h1>
          <p>Achetez et vendez des vêtements de seconde main entre particuliers, en toute confiance, partout en Tunisie.</p>
          <div className="auth-art-emoji" aria-hidden="true">🛍️</div>
        </div>
        <span>La mode circulaire, simplement.</span>
      </section>
      <section className="auth-form-side"><Outlet /></section>
    </main>
  );
}
