import api from "./api.js";

export const orderService = {
  async checkout(payload) {
    return (await api.post("/orders/checkout", payload)).data;
  },
};
