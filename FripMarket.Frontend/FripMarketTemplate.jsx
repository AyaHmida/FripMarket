import { useState, useMemo } from "react";

/* ============ FripMarket – Template UI (React) ============
   Pages : Accueil · Catalogue · Fiche produit · Panier/Checkout · Espace vendeur · Admin
   Aucune dépendance autre que React. Remplacez DATA par vos appels API (/api/products...).
   Navigation par état : remplacez-la par react-router dans votre projet.
=============================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600&display=swap');
:root{--bg:#fbf7f2;--card:#fff;--ink:#1f1b16;--mute:#7a7066;--line:#ece4da;--brand:#0f5c63;--brand2:#e4572e;--soft:#e8f1f1;--r:16px}
*{box-sizing:border-box}
.fm{font-family:Inter,system-ui,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh}
.fm h1,.fm h2,.fm h3,.logo{font-family:Fraunces,serif;margin:0}
.fm button{font:inherit;cursor:pointer;border:0}
.wrap{max-width:1200px;margin:0 auto;padding:0 20px}
.promo{background:var(--brand);color:#fff;text-align:center;font-size:13px;padding:8px}
.nav{position:sticky;top:0;z-index:10;background:rgba(251,247,242,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav-top{display:flex;align-items:center;gap:20px;padding:14px 0}
.logo{font-size:26px;color:var(--brand);cursor:pointer;white-space:nowrap}.logo b{color:var(--brand2)}
.search{flex:1;display:flex;background:#fff;border:1px solid var(--line);border-radius:999px;padding:4px 4px 4px 18px}
.search input{flex:1;border:0;outline:0;font:inherit;background:none}
.search button{background:var(--brand);color:#fff;border-radius:999px;padding:8px 20px}
.icons{display:flex;gap:6px}
.ibtn{background:none;font-size:20px;padding:8px 10px;border-radius:12px;position:relative}.ibtn:hover{background:var(--soft)}
.badge{position:absolute;top:0;right:0;background:var(--brand2);color:#fff;font-size:11px;border-radius:99px;padding:1px 6px}
.cats{display:flex;gap:8px;overflow-x:auto;padding:0 0 12px}
.cats a{padding:6px 16px;border-radius:99px;font-size:14px;font-weight:500;cursor:pointer;white-space:nowrap;color:var(--mute)}
.cats a:hover,.cats a.on{background:var(--ink);color:#fff}
.btn{background:var(--brand2);color:#fff;border-radius:99px;padding:12px 26px;font-weight:600;transition:.2s}.btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(228,87,46,.3)}
.btn.alt{background:var(--brand)}.btn.out{background:#fff;color:var(--ink);border:1px solid var(--line)}.btn.sm{padding:7px 14px;font-size:13px}
.hero{margin:28px 0;border-radius:28px;background:linear-gradient(120deg,#0f5c63,#16808a 60%,#f2a65a);color:#fff;display:grid;grid-template-columns:1.2fr 1fr;overflow:hidden;min-height:340px}
.hero>div:first-child{padding:56px}
.hero h1{font-size:clamp(32px,5vw,54px);line-height:1.05}.hero p{opacity:.9;margin:16px 0 28px;max-width:420px}
.hero-art{display:flex;align-items:center;justify-content:center;font-size:150px;filter:drop-shadow(0 20px 30px rgba(0,0,0,.25))}
.sec{margin:44px 0}.sec-h{display:flex;justify-content:space-between;align-items:end;margin-bottom:18px}
.sec-h h2{font-size:28px}.sec-h a{color:var(--brand);font-weight:600;cursor:pointer;font-size:14px}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px}
.tile{border-radius:var(--r);padding:22px 14px;text-align:center;cursor:pointer;font-weight:600;transition:.2s}.tile:hover{transform:translateY(-4px)}
.tile span{display:block;font-size:38px;margin-bottom:8px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:20px}
.card{background:var(--card);border-radius:var(--r);overflow:hidden;border:1px solid var(--line);cursor:pointer;transition:.25s}
.card:hover{transform:translateY(-5px);box-shadow:0 14px 30px rgba(31,27,22,.1)}
.pic{aspect-ratio:4/5;display:flex;align-items:center;justify-content:center;font-size:84px;position:relative}
.fav{position:absolute;top:10px;right:10px;background:#fff;width:34px;height:34px;border-radius:50%;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,.12)}
.tag{position:absolute;left:10px;top:10px;background:#fff;font-size:11px;font-weight:600;padding:4px 10px;border-radius:99px}
.info{padding:12px 14px 16px}.info small{color:var(--mute)}.info h3{font-family:Inter;font-size:15px;font-weight:600;margin:2px 0 6px}
.price{font-weight:700;color:var(--brand);font-size:17px}
.trust{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;background:var(--soft);border-radius:24px;padding:28px}
.trust div{display:flex;gap:12px;align-items:center}.trust span{font-size:30px}.trust p{margin:0;font-size:13px;color:var(--mute)}
.layout{display:grid;grid-template-columns:240px 1fr;gap:28px;margin:28px 0}
.panel{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:20px}
.panel h4{margin:0 0 10px}.chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px}
.chip{border:1px solid var(--line);background:#fff;padding:5px 12px;border-radius:99px;font-size:13px}.chip.on{background:var(--brand);color:#fff;border-color:var(--brand)}
.sel{padding:8px 12px;border:1px solid var(--line);border-radius:10px;font:inherit;background:#fff}
.detail{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin:30px 0}
.gal .pic{border-radius:24px;font-size:200px;aspect-ratio:1}.thumbs{display:flex;gap:10px;margin-top:10px}.thumbs div{width:70px;height:70px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:30px;opacity:.7}
.detail h1{font-size:34px}.big{font-size:32px;font-weight:700;color:var(--brand);margin:10px 0}
.meta{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:18px 0}.meta div{background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px 14px;font-size:14px}.meta small{display:block;color:var(--mute)}
.seller{display:flex;gap:12px;align-items:center;padding:14px;border-radius:var(--r);background:var(--soft);margin:18px 0}
.av{width:46px;height:46px;border-radius:50%;background:var(--brand2);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
.row{display:flex;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid var(--line)}.row .pic{width:72px;aspect-ratio:1;font-size:34px;border-radius:12px;flex:none}.grow{flex:1}
.sum>div{display:flex;justify-content:space-between;padding:6px 0}.sum .tot{border-top:1px solid var(--line);margin-top:8px;padding-top:12px;font-weight:700;font-size:18px}
.opt{display:flex;gap:10px;align-items:center;padding:14px;border:2px solid var(--line);border-radius:12px;margin-bottom:10px;cursor:pointer}.opt.on{border-color:var(--brand);background:var(--soft)}
.dash{display:grid;grid-template-columns:220px 1fr;min-height:70vh;margin:24px 0;gap:24px}
.side{background:var(--ink);color:#fff;border-radius:20px;padding:18px}.side a{display:block;padding:10px 14px;border-radius:10px;color:#cfc7bd;cursor:pointer;font-size:14px}.side a.on,.side a:hover{background:rgba(255,255,255,.12);color:#fff}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:20px}
.kpi{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:18px}.kpi small{color:var(--mute)}.kpi b{display:block;font-size:26px;font-family:Fraunces;margin-top:4px}.kpi i{font-style:normal;color:#2a9d57;font-size:12px}
.bars{display:flex;align-items:end;gap:10px;height:150px}.bars div{flex:1;background:linear-gradient(var(--brand2),#f2a65a);border-radius:8px 8px 0 0}
table{width:100%;border-collapse:collapse;font-size:14px}th{text-align:left;color:var(--mute);font-weight:500;padding:10px;border-bottom:1px solid var(--line)}td{padding:12px 10px;border-bottom:1px solid var(--line)}
.st{padding:3px 10px;border-radius:99px;font-size:12px;font-weight:600}
.s-ok{background:#e1f5e8;color:#1c7a41}.s-wait{background:#fff0d6;color:#a76a00}.s-ship{background:#e0ecff;color:#2459b8}
footer{background:var(--ink);color:#cfc7bd;margin-top:60px;padding:40px 0;font-size:14px}footer .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px}footer .logo{color:#fff}
@media(max-width:800px){.hero,.detail,.layout,.dash{grid-template-columns:1fr}.hero>div:first-child{padding:30px}.hero-art{font-size:90px;padding-bottom:20px}.nav-top{flex-wrap:wrap}.search{order:3;flex-basis:100%}}
`;

const TINTS = ["#f6d7c3", "#d6e8e4", "#f3e3a9", "#dcd3ee", "#f4c9d4", "#cfe3f5"];
const PRODUCTS = [
  { id: 1, t: "Veste en jean oversize", b: "Levi's", p: 45, s: "M", c: "Très bon", cat: "Femmes", e: "🧥", seller: "Sarra B." },
  { id: 2, t: "Robe d'été fleurie", b: "Zara", p: 28, s: "S", c: "Comme neuf", cat: "Femmes", e: "👗", seller: "Meriem K." },
  { id: 3, t: "Sneakers blanches", b: "Nike", p: 90, s: "42", c: "Bon", cat: "Hommes", e: "👟", seller: "Yassine T." },
  { id: 4, t: "Sac à main cuir", b: "Mango", p: 60, s: "—", c: "Très bon", cat: "Femmes", e: "👜", seller: "Ines M." },
  { id: 5, t: "Chemise en lin", b: "Massimo Dutti", p: 35, s: "L", c: "Comme neuf", cat: "Hommes", e: "👔", seller: "Karim H." },
  { id: 6, t: "Pull en laine", b: "H&M", p: 22, s: "M", c: "Bon", cat: "Hommes", e: "🧶", seller: "Hana S." },
  { id: 7, t: "Ensemble enfant", b: "Zara Kids", p: 18, s: "6 ans", c: "Très bon", cat: "Filles", e: "🧒", seller: "Amel R." },
  { id: 8, t: "Lunettes de soleil", b: "Ray-Ban", p: 75, s: "—", c: "Comme neuf", cat: "Accessoires", e: "🕶️", seller: "Skander L." },
].map((x, i) => ({ ...x, tint: TINTS[i % 6] }));
const CATS = ["Tout", "Femmes", "Hommes", "Filles", "Garçons", "Sport", "Accessoires", "Maison"];
const TILES = [["👗", "Femmes"], ["👔", "Hommes"], ["🧸", "Filles"], ["⚽", "Garçons"], ["👟", "Sport"], ["🏠", "Maison"]];
const ORDERS = [["#FM-1042", "Sarra B.", "135,000 TND", "Livrée", "s-ok"], ["#FM-1043", "Karim H.", "62,500 TND", "En préparation", "s-wait"], ["#FM-1044", "Ines M.", "90,000 TND", "Expédiée", "s-ship"], ["#FM-1045", "Hana S.", "28,000 TND", "En attente", "s-wait"]];
const fmt = (n) => n.toFixed(3).replace(".", ",") + " TND";

function Card({ p, onOpen, fav, toggleFav }) {
  return (
    <div className="card" onClick={() => onOpen(p)}>
      <div className="pic" style={{ background: p.tint }}>
        {p.e}
        <span className="tag">{p.c}</span>
        <button className="fav" onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }}>{fav ? "❤️" : "🤍"}</button>
      </div>
      <div className="info"><small>{p.b} · Taille {p.s}</small><h3>{p.t}</h3><div className="price">{fmt(p.p)}</div></div>
    </div>
  );
}

function Home({ go, open, favs, toggleFav }) {
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <h1>Donnez une seconde vie à votre dressing</h1>
          <p>Achetez et vendez des vêtements de seconde main entre particuliers, en toute confiance, partout en Tunisie.</p>
          <button className="btn" onClick={() => go("catalog")}>Explorer le catalogue</button>{" "}
          <button className="btn out" onClick={() => go("seller")}>Vendre un article</button>
        </div>
        <div className="hero-art">🛍️</div>
      </section>
      <section className="sec">
        <div className="sec-h"><h2>Nos rayons</h2></div>
        <div className="tiles">{TILES.map(([e, n], i) => <div key={n} className="tile" style={{ background: TINTS[i] }} onClick={() => go("catalog")}><span>{e}</span>{n}</div>)}</div>
      </section>
      <section className="sec">
        <div className="sec-h"><h2>Nouveautés</h2><a onClick={() => go("catalog")}>Tout voir →</a></div>
        <div className="grid">{PRODUCTS.slice(0, 4).map((p) => <Card key={p.id} p={p} onOpen={open} fav={favs.includes(p.id)} toggleFav={toggleFav} />)}</div>
      </section>
      <section className="trust">
        {[["🔒", "Paiement sécurisé", "Flouci ou à la livraison"], ["🚚", "Livraison partout", "Dans tous les gouvernorats"], ["✅", "Annonces vérifiées", "Modération avant publication"], ["♻️", "Mode durable", "Chaque pièce compte"]].map(([i, t, d]) => <div key={t}><span>{i}</span><div><b>{t}</b><p>{d}</p></div></div>)}
      </section>
    </div>
  );
}

function Catalog({ open, favs, toggleFav, q, cat0 }) {
  const [cat, setCat] = useState(cat0), [max, setMax] = useState(100), [sort, setSort] = useState("new"), [cond, setCond] = useState("Tous");
  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => (cat === "Tout" || p.cat === cat) && p.p <= max && (cond === "Tous" || p.c === cond) && p.t.toLowerCase().includes(q.toLowerCase()));
    if (sort === "asc") l = [...l].sort((a, b) => a.p - b.p);
    if (sort === "desc") l = [...l].sort((a, b) => b.p - a.p);
    return l;
  }, [cat, max, sort, cond, q]);
  return (
    <div className="wrap layout">
      <aside className="panel">
        <h4>Catégorie</h4><div className="chips">{CATS.map((c) => <span key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</span>)}</div>
        <h4>État</h4><div className="chips">{["Tous", "Comme neuf", "Très bon", "Bon"].map((c) => <span key={c} className={"chip" + (cond === c ? " on" : "")} onClick={() => setCond(c)}>{c}</span>)}</div>
        <h4>Prix max : {max} TND</h4><input type="range" min="10" max="100" value={max} onChange={(e) => setMax(+e.target.value)} style={{ width: "100%" }} />
      </aside>
      <div>
        <div className="sec-h"><h2>{list.length} articles</h2>
          <select className="sel" value={sort} onChange={(e) => setSort(e.target.value)}><option value="new">Nouveautés</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option></select></div>
        <div className="grid">{list.map((p) => <Card key={p.id} p={p} onOpen={open} fav={favs.includes(p.id)} toggleFav={toggleFav} />)}</div>
        {!list.length && <p>Aucun article ne correspond à votre recherche.</p>}
      </div>
    </div>
  );
}

function Product({ p, add, inCart, go }) {
  return (
    <div className="wrap detail">
      <div className="gal"><div className="pic" style={{ background: p.tint }}>{p.e}</div>
        <div className="thumbs">{[0, 1, 2].map((i) => <div key={i} style={{ background: TINTS[(p.id + i) % 6] }}>{p.e}</div>)}</div></div>
      <div>
        <span className="chip on">Disponible</span>
        <h1 style={{ marginTop: 10 }}>{p.t}</h1>
        <div className="big">{fmt(p.p)}</div>
        <div className="meta"><div><small>Marque</small>{p.b}</div><div><small>Taille</small>{p.s}</div><div><small>État</small>{p.c}</div><div><small>Catégorie</small>{p.cat}</div></div>
        <p style={{ color: "var(--mute)" }}>Pièce unique en excellent état, soigneusement entretenue. Photos non contractuelles dans ce template.</p>
        <div className="seller"><div className="av">{p.seller[0]}</div><div className="grow"><b>{p.seller}</b><br /><small>★ 4,8 · 32 ventes</small></div><button className="btn out sm">Voir le dressing</button></div>
        <button className="btn" disabled={inCart} onClick={() => { add(p); go("cart"); }}>{inCart ? "Déjà dans le panier" : "Ajouter au panier"}</button>
      </div>
    </div>
  );
}

function Cart({ items, remove, go }) {
  const [pay, setPay] = useState("flouci"), [done, setDone] = useState(false);
  const sub = items.reduce((s, p) => s + p.p, 0), sellers = new Set(items.map((p) => p.seller)).size, ship = sellers * 7;
  if (done) return <div className="wrap" style={{ textAlign: "center", padding: "80px 0" }}><div style={{ fontSize: 80 }}>🎉</div><h1>Commande confirmée !</h1><p>Merci pour votre achat. Retrouvez votre facture dans « Mes commandes ».</p><button className="btn" onClick={() => go("home")}>Retour à l'accueil</button></div>;
  return (
    <div className="wrap layout" style={{ gridTemplateColumns: "1fr 360px" }}>
      <div className="panel"><h2>Mon panier ({items.length})</h2>
        {items.map((p) => <div className="row" key={p.id}><div className="pic" style={{ background: p.tint }}>{p.e}</div><div className="grow"><b>{p.t}</b><br /><small>Vendeur : {p.seller}</small></div><b>{fmt(p.p)}</b><button className="btn out sm" onClick={() => remove(p.id)}>✕</button></div>)}
        {!items.length && <p>Votre panier est vide.</p>}
      </div>
      <div className="panel sum"><h3>Récapitulatif</h3>
        <div><span>Articles</span><span>{fmt(sub)}</span></div><div><span>Livraison ({sellers} colis)</span><span>{fmt(ship)}</span></div>
        <div className="tot"><span>Total</span><span>{fmt(sub + ship)}</span></div>
        <h4>Paiement</h4>
        {[["flouci", "💳 Payer en ligne avec Flouci"], ["cod", "💵 Paiement à la livraison"]].map(([k, l]) => <div key={k} className={"opt" + (pay === k ? " on" : "")} onClick={() => setPay(k)}>{l}</div>)}
        <button className="btn alt" style={{ width: "100%" }} disabled={!items.length} onClick={() => setDone(true)}>Confirmer la commande</button>
      </div>
    </div>
  );
}

function Dashboard({ admin }) {
  const k = admin ? [["Utilisateurs", "1 248", "+12%"], ["Annonces en attente", "37", ""], ["Ventes du mois", "18 450 TND", "+8%"], ["Commissions", "1 845 TND", "+8%"]] : [["Mes annonces", "24", ""], ["Ventes du mois", "1 120 TND", "+15%"], ["À expédier", "3", ""], ["Solde estimé", "890 TND", "+5%"]];
  const [tab, setTab] = useState(0), links = admin ? ["Tableau de bord", "Modération", "Utilisateurs", "Commandes", "Commissions"] : ["Tableau de bord", "Mes annonces", "Mes ventes", "Expéditions", "Profil"];
  return (
    <div className="wrap dash">
      <nav className="side"><div className="logo" style={{ color: "#fff", padding: "6px 14px 16px", fontSize: 20 }}>{admin ? "Admin" : "Mon dressing"}</div>{links.map((l, i) => <a key={l} className={tab === i ? "on" : ""} onClick={() => setTab(i)}>{l}</a>)}</nav>
      <main>
        <div className="kpis">{k.map(([a, b, c]) => <div className="kpi" key={a}><small>{a}</small><b>{b}</b><i>{c}</i></div>)}</div>
        <div className="panel" style={{ marginBottom: 20 }}><h3>Ventes sur 7 jours</h3><div className="bars">{[40, 65, 50, 85, 70, 100, 80].map((h, i) => <div key={i} style={{ height: h + "%" }} />)}</div></div>
        <div className="panel"><h3 style={{ marginBottom: 8 }}>Dernières commandes</h3>
          <table><thead><tr><th>N°</th><th>Client</th><th>Total</th><th>Statut</th></tr></thead>
            <tbody>{ORDERS.map(([n, c, t, s, cl]) => <tr key={n}><td>{n}</td><td>{c}</td><td>{t}</td><td><span className={"st " + cl}>{s}</span></td></tr>)}</tbody></table></div>
      </main>
    </div>
  );
}

export default function FripMarketApp() {
  const [page, setPage] = useState("home"), [cur, setCur] = useState(PRODUCTS[0]), [cart, setCart] = useState([]), [favs, setFavs] = useState([]), [q, setQ] = useState(""), [cat0, setCat0] = useState("Tout");
  const go = (p, c = "Tout") => { setCat0(c); setPage(p); window.scrollTo?.(0, 0); };
  const open = (p) => { setCur(p); go("product"); };
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  return (
    <div className="fm">
      <style>{CSS}</style>
      <div className="promo">🚚 Livraison dans toute la Tunisie · Paiement à la livraison disponible</div>
      <header className="nav"><div className="wrap">
        <div className="nav-top">
          <div className="logo" onClick={() => go("home")}>Frip<b>Market</b></div>
          <form className="search" onSubmit={(e) => { e.preventDefault(); go("catalog"); }}><input placeholder="Rechercher une veste, une marque…" value={q} onChange={(e) => setQ(e.target.value)} /><button>Rechercher</button></form>
          <div className="icons">
            <button className="ibtn" title="Favoris">🤍{favs.length > 0 && <span className="badge">{favs.length}</span>}</button>
            <button className="ibtn" title="Panier" onClick={() => go("cart")}>🛒{cart.length > 0 && <span className="badge">{cart.length}</span>}</button>
            <button className="ibtn" title="Espace vendeur" onClick={() => go("seller")}>🏪</button>
            <button className="ibtn" title="Admin" onClick={() => go("admin")}>⚙️</button>
          </div>
        </div>
        <div className="cats">{CATS.map((c) => <a key={c} className={page === "catalog" && cat0 === c ? "on" : ""} onClick={() => go("catalog", c)}>{c}</a>)}</div>
      </div></header>
      {page === "home" && <Home go={go} open={open} favs={favs} toggleFav={toggleFav} />}
      {page === "catalog" && <Catalog key={cat0 + q} open={open} favs={favs} toggleFav={toggleFav} q={q} cat0={cat0} />}
      {page === "product" && <Product p={cur} add={(p) => setCart((c) => [...c, p])} inCart={cart.some((x) => x.id === cur.id)} go={go} />}
      {page === "cart" && <Cart items={cart} remove={(id) => setCart((c) => c.filter((x) => x.id !== id))} go={go} />}
      {page === "seller" && <Dashboard />}
      {page === "admin" && <Dashboard admin />}
      <footer><div className="wrap"><div><div className="logo">FripMarket</div><p>La marketplace de seconde main en Tunisie.</p></div><div>Aide · Livraison · Retours · CGU · Contact</div></div></footer>
    </div>
  );
}
