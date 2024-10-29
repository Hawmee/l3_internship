import { useSelector } from "react-redux";
import { io } from "socket.io-client";


const url = import.meta.env.VITE_SOCKET_URL

console.log(url);


const Socket = io(url)


export default Socket