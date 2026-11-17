import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import PasswordStrength from "../components/PasswordStrength.jsx";
import usePasswordStrength from "../hooks/usePasswordStrength.js";
import { authService } from "../services/authService.js";
import { getApiError } from "../utils/apiError.js";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const email = params.get("email") || "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const strength = usePasswordStrength(password);

  useEffect(() => {
    if (!success) return undefined;
    const timer = window.setTimeout(() => { window.location.assign("/login"); }, 2500);
    return () => window.clearTimeout(timer);
  }, [success]);

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!strength.valid) nextErrors.password = "8 caractères minimum, avec une majuscule, une minuscule et un chiffre.";
    if (confirmation !== password) nextErrors.confirmation = "Les mots de passe ne correspondent pas.";
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    try {
      await authService.resetPassword({ token, email, password });
      setSuccess(true);
    } catch (error) {
      setServerError(getApiError(error, "Ce lien de réinitialisation est invalide ou a expiré."));
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return <section className="auth-card"><h2>Lien invalide</h2><Alert>Ce lien de réinitialisation est invalide ou incomplet. Demandez un nouveau lien.</Alert><p className="auth-foot"><Link className="auth-link" to="/forgot-password">Demander un nouveau lien</Link></p></section>;
  }
  return (
    <section className="auth-card">
      <h2>Nouveau mot de passe</h2><p className="auth-subtitle">Choisissez un nouveau mot de passe pour votre compte.</p>
      {success ? <><Alert type="success">Votre mot de passe a été modifié. Redirection vers la connexion…</Alert><p className="auth-foot"><Link className="auth-link" to="/login">Se connecter</Link></p></> : (
        <form className="auth-form" onSubmit={submit} noValidate>
          <Alert>{serverError}</Alert>
          <div><Input label="Nouveau mot de passe" type="password" autoComplete="new-password" value={password} error={errors.password} onChange={(event) => setPassword(event.target.value)} /><PasswordStrength password={password} /></div>
          <Input label="Confirmer le mot de passe" type="password" autoComplete="new-password" value={confirmation} error={errors.confirmation} onChange={(event) => setConfirmation(event.target.value)} />
          <Button type="submit" loading={loading}>Réinitialiser le mot de passe</Button>
        </form>
      )}
    </section>
  );
}
