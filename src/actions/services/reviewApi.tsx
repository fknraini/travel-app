import { axiosClient } from "../apiClient";

export const reviewApi = {
  getReviews: async () => {
    try {
      const res = await axiosClient.get("/api/review");
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getReview: async (id: any) => {
    try {
      const res = await axiosClient.get(`/api/review/${id}`);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  createReview: async (iduser: any, data: any) => {
    try {
      const res = await axiosClient.post(`/api/review/${iduser}`, data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  updateReview: async (id: any, data: any) => {
    try {
      const res = await axiosClient.put(`/api/review/update/${id}`, data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  deleteReview: async (id: any) => {
    try {
      const res = await axiosClient.delete(`/api/review/delete/${id}`);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
