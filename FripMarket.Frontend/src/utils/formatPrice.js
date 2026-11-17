export default function formatPrice(amount) {
  return `${Number(amount).toFixed(3).replace(".", ",")} TND`;
}
