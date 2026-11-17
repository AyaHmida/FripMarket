const ITEMS = [
  ["🔒", "Paiement sécurisé", "Flouci ou à la livraison"],
  ["🚚", "Livraison partout", "Dans tous les gouvernorats"],
  ["✅", "Annonces vérifiées", "Modération avant publication"],
  ["♻️", "Mode durable", "Chaque pièce compte"],
];

export default function TrustBar() {
  return <section className="trust">{ITEMS.map(([emoji, title, description]) => <div key={title}><span>{emoji}</span><div><b>{title}</b><p>{description}</p></div></div>)}</section>;
}
