import axios from "axios";
import { store } from "../redux/store";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, /",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  // console.log("state: ", store.getState());
  const status = Cookies.get("cookie")
  if (status) {
    // const token = state.auth.account.token;
    // console.log("stateeeeeeee", state.auth)
    const token = Cookies.get("token");
    // const token = localStorage.getItem("tokenn");
    // console.log("token: ", Cookies.get("token"));
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
// axios.interceptors.request.use(request => {
//   // Edit request config
//   let token = Cookies.get("token");
//   request.headers['Authorization'] = `Bearer ${token}`;
//   return request;
// }, error => {
//   return Promise.reject(error);
// });


export { axiosClient };
