import { axiosClient } from "../apiClient";

export const destinationApi = {
  getDestinations: async () => {
    try {
      const res = await axiosClient.get("/api/destination");
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getDestination: async (id: any) => {
    try {
      const res = await axiosClient.get(`/api/destination/${id}`);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  createDestination: async (data: any) => {
    try {
      const res = await axiosClient.post("/api/destination/create", data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  updateDestination: async (id: any, data: any) => {
    try {
      const res = await axiosClient.put(`/api/destination/update/${id}`, data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  deleteDestination: async (id: any) => {
    try {
      const res = await axiosClient.delete(`/api/destination/delete/${id}`);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
