import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import PromoBar from "../components/PromoBar.jsx";

export default function MainLayout() {
  return <div className="fm"><PromoBar /><Navbar /><main><Outlet /></main><Footer /></div>;
}
