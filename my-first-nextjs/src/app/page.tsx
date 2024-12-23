"use client";

import { useState } from "react";
import useSocket from "@/../lib/useSocket";

const Chat = () => {
    const [message, setMessage] = useState("");
    const { messages, sendMessage } = useSocket();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");  // Clear the input field
    };

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
