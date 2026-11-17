import usePasswordStrength from "../hooks/usePasswordStrength.js";

export default function PasswordStrength({ password }) {
  const strength = usePasswordStrength(password);
  if (!password) return null;
  return (
    <div className="password-strength" aria-live="polite">
      <div className="strength-track" aria-label={`Force du mot de passe : ${strength.label}`}>
        <span className={`strength-${strength.level}`} style={{ width: `${strength.level * 33.333}%` }} />
      </div>
      <small>Force du mot de passe : {strength.label}</small>
    </div>
  );
}
