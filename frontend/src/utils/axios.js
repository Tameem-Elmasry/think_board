import axios from "axios";

const BASE_URL =
    import.meta.env.MODE === "development"
        ? `${import.meta.env.VITE_DEV_URL}/api`
        : `${import.meta.env.VITE_API_URL}/api`;
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default api;
