import { io, Socket } from "socket.io-client";

// Define the server URL for the WebSocket connection.
const SERVER_URL = 'http://localhost:3000'; 

// Create a new socket instance with the specified server URL.
const socket: Socket = io(SERVER_URL, {
    autoConnect: false, 
});

// Manually initiate the socket connection.
socket.connect();

export default socket;
