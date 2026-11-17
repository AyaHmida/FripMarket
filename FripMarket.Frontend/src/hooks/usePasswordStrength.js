export default function usePasswordStrength(password = "") {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const level = score <= 2 ? 1 : score <= 4 ? 2 : 3;
  return {
    score,
    label: password.length === 0 ? "" : level === 1 ? "Faible" : level === 2 ? "Moyen" : "Fort",
    level,
    valid: checks.slice(0, 4).every(Boolean),
  };
}
