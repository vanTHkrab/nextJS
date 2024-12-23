"use strict";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

const useSocket = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        // Initialize socket connection
        socket = io("http://localhost:3000");

        // Listen for messages from the server
        socket.on("receiveMessage", (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (message: string) => {
        // Emit the message to the server
        socket.emit("sendMessage", message);
    };

    return { messages, sendMessage };
};

export default useSocket;
