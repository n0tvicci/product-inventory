import { create } from "zustand";
import axios from "../utils/axios";
import { BACKEND_URI } from "../configs/api";

const ProductStore = create((set) => ({
  message: null,
  product: null,
  products: null,
  getProducts: async () => {
    try {
      const response = await axios.get(`${BACKEND_URI}/api/getProducts`);
      set({
        products: response.data.products,
      });
    } catch (error) {
      throw new Error("Failed to get products.");
    }
  },
  getProduct: async (payload) => {
    try {
      const response = await axios.get(
        `${BACKEND_URI}/api/getProduct/${payload}`
      );
      set({
        product: response.data.product,
      });
    } catch (error) {
      throw new Error("Failed to get products.");
    }
  },
  createProduct: async (payload) => {
    try {
      const response = await axios.post(
        `${BACKEND_URI}/api/createProduct`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({
        product: response.data.product,
      });
    } catch (error) {
      throw new Error(error.response.data.error || "An error occured.");
    }
  },
  updateProduct: async (payload) => {
    try {
      const response = await axios.post(
        `${BACKEND_URI}/api/updateProduct/${payload.id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({
        product: response.data.product,
      });
    } catch (error) {
      throw new Error(error.response.data.error || "An error occured.");
    }
  },
  deleteProduct: async (id) => {
    try {
      const response = await axios.post(
        `${BACKEND_URI}/api/deleteProduct/${id}`,
        null
      );
      set({
        message: response.data.message,
      });
    } catch (error) {
      throw new Error(error.response.data.error || "An error occured.");
    }
  },
}));

export default ProductStore;
