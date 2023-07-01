import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_WEATHER_API,  
})

export default axiosClient;