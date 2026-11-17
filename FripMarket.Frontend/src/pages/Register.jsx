import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import PasswordStrength from "../components/PasswordStrength.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import usePasswordStrength from "../hooks/usePasswordStrength.js";
import { getApiError } from "../utils/apiError.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+216\d{8}$/;

export default function Register() {
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "", acceptedTerms: false, wantsToSell: false });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const passwordStrength = usePasswordStrength(values.password);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.firstName.trim()) nextErrors.firstName = "Le prénom est obligatoire.";
    if (!values.lastName.trim()) nextErrors.lastName = "Le nom est obligatoire.";
    if (!EMAIL_PATTERN.test(values.email.trim())) nextErrors.email = "Saisissez une adresse e-mail valide.";
    if (!PHONE_PATTERN.test(values.phone.trim())) nextErrors.phone = "Saisissez un numéro au format +216 suivi de 8 chiffres.";
    if (!passwordStrength.valid) nextErrors.password = "8 caractères minimum, avec une majuscule, une minuscule et un chiffre.";
    if (values.confirmPassword !== values.password) nextErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    if (!values.acceptedTerms) nextErrors.acceptedTerms = "Vous devez accepter les conditions d'utilisation.";
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const response = await register({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
        wantsToSell: values.wantsToSell,
      });
      if (response.authenticated) navigate(response.user?.roles?.includes("Seller") ? "/seller" : "/", { replace: true });
      else setSuccess("Votre compte a été créé. Vérifiez votre e-mail pour confirmer votre inscription.");
    } catch (error) {
      setServerError(getApiError(error, "Inscription impossible pour le moment. Veuillez réessayer."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-card">
      <h2>Créer un compte</h2><p className="auth-subtitle">Rejoignez la communauté FripMarket.</p>
      {success ? <><Alert type="success">{success}</Alert><p className="auth-foot"><Link className="auth-link" to="/login">Se connecter</Link></p></> : (
        <form className="auth-form" onSubmit={submit} noValidate>
          <Alert>{serverError}</Alert>
          <Input label="Prénom" autoComplete="given-name" value={values.firstName} error={errors.firstName} onChange={(event) => setValues({ ...values, firstName: event.target.value })} />
          <Input label="Nom" autoComplete="family-name" value={values.lastName} error={errors.lastName} onChange={(event) => setValues({ ...values, lastName: event.target.value })} />
          <Input label="E-mail" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(event) => setValues({ ...values, email: event.target.value })} />
          <Input label="Téléphone tunisien" type="tel" placeholder="+21612345678" autoComplete="tel" value={values.phone} error={errors.phone} onChange={(event) => setValues({ ...values, phone: event.target.value })} />
          <div><Input label="Mot de passe" type="password" autoComplete="new-password" value={values.password} error={errors.password} onChange={(event) => setValues({ ...values, password: event.target.value })} /><PasswordStrength password={values.password} /></div>
          <Input label="Confirmer le mot de passe" type="password" autoComplete="new-password" value={values.confirmPassword} error={errors.confirmPassword} onChange={(event) => setValues({ ...values, confirmPassword: event.target.value })} />
          <div>
            <label className="check-line"><input type="checkbox" checked={values.acceptedTerms} aria-invalid={Boolean(errors.acceptedTerms)} aria-describedby={errors.acceptedTerms ? "terms-error" : undefined} onChange={(event) => setValues({ ...values, acceptedTerms: event.target.checked })} />J'accepte les conditions d'utilisation</label>
            {errors.acceptedTerms && <span className="field-error" id="terms-error" aria-live="polite">{errors.acceptedTerms}</span>}
          </div>
          <label className="check-line"><input type="checkbox" checked={values.wantsToSell} onChange={(event) => setValues({ ...values, wantsToSell: event.target.checked })} />Je souhaite aussi vendre des articles</label>
          <Button type="submit" loading={loading}>Créer mon compte</Button>
        </form>
      )}
      {!success && <p className="auth-foot">Déjà inscrit ? <Link className="auth-link" to="/login">Se connecter</Link></p>}
    </section>
  );
}
