export default function Button({ variant = "primary", loading = false, className = "", children, disabled, ...props }) {
  const classes = ["btn", variant === "outline" ? "out" : variant === "secondary" ? "alt" : "", className].filter(Boolean).join(" ");
  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
