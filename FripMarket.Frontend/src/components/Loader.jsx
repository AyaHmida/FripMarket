export default function Loader() {
  return <div className="not-found" role="status" aria-live="polite"><span className="spinner" style={{ borderColor: "var(--line)", borderTopColor: "var(--brand)", width: 32, height: 32 }} /><span>Chargement…</span></div>;
}
