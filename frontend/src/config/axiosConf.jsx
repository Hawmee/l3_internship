import axios from "axios";
import { useSelector } from "react-redux";

const url = useSelector((state)=>state.backendUrl.value)

const axiosInstance = axios.create({
    baseURL:url ,
    withCredentials: true
})

export default axiosInstance;