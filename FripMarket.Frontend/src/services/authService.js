import api from "./api.js";

export const authService = {
  async login(payload) {
    return (await api.post("/auth/login", payload)).data;
  },
  async register(payload) {
    return (await api.post("/auth/register", payload)).data;
  },
  async forgotPassword(payload) {
    return (await api.post("/auth/forgot-password", payload)).data;
  },
  async resetPassword(payload) {
    return (await api.post("/auth/reset-password", payload)).data;
  },
};
