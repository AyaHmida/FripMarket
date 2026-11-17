import { Link, NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout({ admin = false }) {
  const links = admin
    ? [["Tableau de bord", "/admin"], ["Modération", "/admin/moderation"], ["Utilisateurs", "/admin/users"], ["Commandes", "/admin/orders"], ["Commissions", "/admin/commissions"]]
    : [["Tableau de bord", "/seller"], ["Mes annonces", "/seller/listings"], ["Mes ventes", "/seller/sales"], ["Expéditions", "/seller/shipments"], ["Profil", "/seller/profile"]];
  return (
    <div className="wrap dash">
      <nav className="side" aria-label="Navigation du tableau de bord">
        <Link className="logo" to={admin ? "/admin" : "/seller"} style={{ color: "#fff", padding: "6px 14px 16px", display: "block", fontSize: 20 }}>{admin ? "Admin" : "Mon dressing"}</Link>
        {links.map(([label, path]) => <NavLink key={label} end={path === "/admin" || path === "/seller"} to={path} className={({ isActive }) => isActive ? "on" : ""}>{label}</NavLink>)}
      </nav>
      <main><Outlet /></main>
    </div>
  );
}
