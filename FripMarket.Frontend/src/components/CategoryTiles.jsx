import { Link } from "react-router-dom";
import { TILES } from "../data/mockProducts.js";

const TINTS = ["#f6d7c3", "#d6e8e4", "#f3e3a9", "#dcd3ee", "#f4c9d4", "#cfe3f5"];

export default function CategoryTiles() {
  return (
    <div className="tiles">
      {TILES.map(([emoji, name], index) => (
        <Link key={name} to={`/catalog?category=${encodeURIComponent(name)}`} className="tile" style={{ background: TINTS[index] }}>
          <span>{emoji}</span>{name}
        </Link>
      ))}
    </div>
  );
}
