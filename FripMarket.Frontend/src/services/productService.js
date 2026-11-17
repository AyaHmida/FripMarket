import api from "./api.js";
import { PRODUCTS } from "../data/mockProducts.js";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

export const productService = {
  async getAll(params = {}) {
    if (USE_MOCKS) return PRODUCTS;
    return (await api.get("/products", { params })).data;
  },
  async getById(id) {
    if (USE_MOCKS) return PRODUCTS.find((product) => String(product.id) === String(id)) || null;
    return (await api.get(`/products/${id}`)).data;
  },
};
