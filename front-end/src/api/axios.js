import axios from "axios";

//  Automatically uses the environment variable
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, //  dynamic base URL
  withCredentials: true, // send cookies to backend
});

export default api;
