import { useId, useState } from "react";

export default function Input({ label, error, id, type = "text", icon, ...props }) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      <div className={password ? "password-input" : ""}>
        {icon}
        <input
          id={inputId}
          type={password && visible ? "text" : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {password && (
          <button className="password-toggle" type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
            {visible ? "Masquer" : "Afficher"}
          </button>
        )}
      </div>
      {error && <span className="field-error" id={errorId} aria-live="polite">{error}</span>}
    </div>
  );
}
