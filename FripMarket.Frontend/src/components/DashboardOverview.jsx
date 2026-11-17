import { ORDERS } from "../data/mockProducts.js";

export default function DashboardOverview({ admin = false }) {
  const stats = admin
    ? [["Utilisateurs", "1 248", "+12%"], ["Annonces en attente", "37", ""], ["Ventes du mois", "18 450 TND", "+8%"], ["Commissions", "1 845 TND", "+8%"]]
    : [["Mes annonces", "24", ""], ["Ventes du mois", "1 120 TND", "+15%"], ["À expédier", "3", ""], ["Solde estimé", "890 TND", "+5%"]];
  return (
    <>
      <div className="kpis">{stats.map(([label, amount, trend]) => <div className="kpi" key={label}><small>{label}</small><b>{amount}</b><i>{trend}</i></div>)}</div>
      <div className="panel" style={{ marginBottom: 20 }}><h3>Ventes sur 7 jours</h3><div className="bars">{[40, 65, 50, 85, 70, 100, 80].map((height, index) => <div key={index} style={{ height: `${height}%` }} />)}</div></div>
      <div className="panel"><h3 style={{ marginBottom: 8 }}>Dernières commandes</h3>
        <div style={{ overflowX: "auto" }}><table><thead><tr><th>N°</th><th>Client</th><th>Total</th><th>Statut</th></tr></thead>
          <tbody>{ORDERS.map(([number, client, total, status, statusClass]) => <tr key={number}><td>{number}</td><td>{client}</td><td>{total}</td><td><span className={`st ${statusClass}`}>{status}</span></td></tr>)}</tbody></table></div>
      </div>
    </>
  );
}
