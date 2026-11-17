import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { authService } from "../services/authService.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEUTRAL_SUCCESS = "Si un compte existe avec cette adresse, vous recevrez un lien.";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Saisissez une adresse e-mail valide.");
      return;
    }
    setLoading(true);
    try {
      await authService.forgotPassword({ email: email.trim() });
      setSent(true);
    } catch {
      // Le message est volontairement identique pour éviter de révéler l'existence d'un compte.
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-card">
      <h2>Mot de passe oublié ?</h2><p className="auth-subtitle">Indiquez votre e-mail pour recevoir un lien de réinitialisation.</p>
      {sent ? <Alert type="success">{NEUTRAL_SUCCESS}</Alert> : (
        <form className="auth-form" onSubmit={submit} noValidate>
          <Input label="E-mail" type="email" autoComplete="email" value={email} error={error} onChange={(event) => setEmail(event.target.value)} />
          <Button type="submit" loading={loading}>Envoyer le lien de réinitialisation</Button>
        </form>
      )}
      <p className="auth-foot"><Link className="auth-link" to="/login">← Retour à la connexion</Link></p>
    </section>
  );
}
