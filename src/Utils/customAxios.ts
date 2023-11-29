import axios from "axios";
const customAxios = axios.create({
  //baseURL: "https://bookheaven.onrender.com/api",
  baseURL: import.meta.env.VITE_API_URL,
});
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default customAxios;
