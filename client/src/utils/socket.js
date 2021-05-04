import socketIO from "socket.io-client";
import {BASE_URL} from "@/config";

const socket = socketIO(BASE_URL, {transports: ["polling", "websocket"]});

export default socket;