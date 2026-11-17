import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const Catalog = lazy(() => import("../pages/Catalog.jsx"));
const ProductDetail = lazy(() => import("../pages/ProductDetail.jsx"));
const Cart = lazy(() => import("../pages/Cart.jsx"));
const SellerDashboard = lazy(() => import("../pages/SellerDashboard.jsx"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="seller" element={<ProtectedRoute roles={["Seller", "Admin"]}><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<SellerDashboard />} />
            <Route path="*" element={<SellerDashboard />} />
          </Route>
          <Route path="admin" element={<ProtectedRoute roles={["Admin"]}><DashboardLayout admin /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="*" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
