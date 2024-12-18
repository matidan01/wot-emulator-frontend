import { io, Socket } from "socket.io-client";

const SERVER_URL = 'http://localhost:3000'; 
const socket: Socket = io(SERVER_URL, {
    autoConnect: false, 
});

socket.connect();

export default socket;
