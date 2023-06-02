import { create } from "zustand";
import axios from "../utils/axios";
import jwt_decode from "jwt-decode";
import { BACKEND_URI } from "../configs/api";

const UserAuthStore = create((set) => ({
  token:
    typeof window !== "undefined" ? window.localStorage.getItem("token") : null,
  me: null,
  message: null,
  signUpUser: async (payload) => {
    try {
      const response = await axios.post(`${BACKEND_URI}/api/signup`, payload);
      set({
        token: response.data.token,
        message: response.data.message,
      });
    } catch (error) {
      throw new Error(error.response.data.error || "An error occured.");
    }
  },
  signInUser: async (payload) => {
    try {
      const response = await axios.post(`${BACKEND_URI}/api/signin`, payload);
      localStorage.setItem("token", response.data.token);
      set({
        token: response.data.token,
        message: response.data.message,
      });
    } catch (error) {
      throw new Error("User email or password is incorrect.");
    }
  },
  getMe: async () => {
    try {
      const response = await axios.get(`${BACKEND_URI}/api/me`);
      set({
        me: response.data.user,
      });
    } catch (error) {
      throw new Error("Failed to get user data.");
    }
  },
  signOutUser: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      me: null,
      message: null,
    });
  },
  isTokenExpired: () => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;

    if (!token) {
      return true;
    }

    const decodedToken = jwt_decode(token);
    const currentTime = Date.now();

    return decodedToken.exp < currentTime;
  },
}));

export default UserAuthStore;
