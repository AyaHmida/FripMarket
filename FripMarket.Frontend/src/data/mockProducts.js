const TINTS = ["#f6d7c3", "#d6e8e4", "#f3e3a9", "#dcd3ee", "#f4c9d4", "#cfe3f5"];

export const PRODUCTS = [
  { id: 1, t: "Veste en jean oversize", b: "Levi's", p: 45, s: "M", c: "Très bon", cat: "Femmes", e: "🧥", seller: "Sarra B." },
  { id: 2, t: "Robe d'été fleurie", b: "Zara", p: 28, s: "S", c: "Comme neuf", cat: "Femmes", e: "👗", seller: "Meriem K." },
  { id: 3, t: "Sneakers blanches", b: "Nike", p: 90, s: "42", c: "Bon", cat: "Hommes", e: "👟", seller: "Yassine T." },
  { id: 4, t: "Sac à main cuir", b: "Mango", p: 60, s: "—", c: "Très bon", cat: "Femmes", e: "👜", seller: "Ines M." },
  { id: 5, t: "Chemise en lin", b: "Massimo Dutti", p: 35, s: "L", c: "Comme neuf", cat: "Hommes", e: "👔", seller: "Karim H." },
  { id: 6, t: "Pull en laine", b: "H&M", p: 22, s: "M", c: "Bon", cat: "Hommes", e: "🧶", seller: "Hana S." },
  { id: 7, t: "Ensemble enfant", b: "Zara Kids", p: 18, s: "6 ans", c: "Très bon", cat: "Filles", e: "🧒", seller: "Amel R." },
  { id: 8, t: "Lunettes de soleil", b: "Ray-Ban", p: 75, s: "—", c: "Comme neuf", cat: "Accessoires", e: "🕶️", seller: "Skander L." },
].map((product, index) => ({ ...product, tint: TINTS[index % TINTS.length] }));

export const CATS = ["Tout", "Femmes", "Hommes", "Filles", "Garçons", "Sport", "Accessoires", "Maison"];
export const TILES = [["👗", "Femmes"], ["👔", "Hommes"], ["🧸", "Filles"], ["⚽", "Garçons"], ["👟", "Sport"], ["🏠", "Maison"]];
export const ORDERS = [
  ["#FM-1042", "Sarra B.", "135,000 TND", "Livrée", "s-ok"],
  ["#FM-1043", "Karim H.", "62,500 TND", "En préparation", "s-wait"],
  ["#FM-1044", "Ines M.", "90,000 TND", "Expédiée", "s-ship"],
  ["#FM-1045", "Hana S.", "28,000 TND", "En attente", "s-wait"],
];
