import { axiosClient } from "../apiClient";
import Cookies from "js-cookie";

export const userApi = {

  getUsers: async () => {
    try {
      const res = await axiosClient.get("/api/user");
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getUser: async (id: any) => {
    try {
      const res = await axiosClient.get(`/api/user/${id}`);
      console.log(res.data.data.roles[0].name);
      Cookies.set("role", res.data.data.roles[0].name);
      Cookies.set("roleIndex", res.data.data.roles.id);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  createUser: async (data: any) => {
    try {
      const res = await axiosClient.post("/api/user/create", data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  assignRole: async (id: any, data: any) => {
    try {
      const res = await axiosClient.post(`/api/user/role/${id}`, data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  
  deleteUser: async (id: any) => {
    try {
      const res = await axiosClient.delete(`/api/user/delete/${id}`);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
