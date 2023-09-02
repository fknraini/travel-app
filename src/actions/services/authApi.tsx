import { axiosClient } from "../apiClient";
import Cookies from "js-cookie";

export const authApi = {
  login: async (data: any) => {
    try {
      const res = await axiosClient.post("/api/login", data);
      if (res.status === 200) {
        Cookies.set("cookie", res.data.status);
      }
      console.log("resdata", res.data.data.token);
      Cookies.set('token', res.data.data.token);
      Cookies.set("user", res.data.data.user);
      Cookies.set("id_user", res.data.data.user.id);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  register: async (data: any) => {
    try {
      const res = await axiosClient.post("/api/register", data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  logout: async () => {
    try {
      const res = await axiosClient.post("/api/logout");
      console.log("logged", res);
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("id_user");
      Cookies.remove("role");
      console.log("res logout", res);
      window.location.href='/';
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
