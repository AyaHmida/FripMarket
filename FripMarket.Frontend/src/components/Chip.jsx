export default function Chip({ active = false, children, className = "", ...props }) {
  return <button type="button" className={`chip${active ? " on" : ""} ${className}`.trim()} aria-pressed={active} {...props}>{children}</button>;
}
