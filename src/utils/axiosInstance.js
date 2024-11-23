import axios from "axios";
import { SERVER_URL } from "../constant/ServerUrl";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export default axiosInstance;
