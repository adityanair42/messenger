import axios from "axios";
import { Message } from "../components/message";
import { BACKEND_URL } from "../config/BACKEND_URL";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface MessageType {
  username: string;
  message: string;
}

export function Chats() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 1000); // Poll for new messages
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function fetchChats() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(BACKEND_URL + "/chats", {
        headers: {
          Authorization: token,
        },
      });
      setMessages(response.data.chats);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch chats", error);
      setError("Failed to load messages");
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        navigate("/login");
      }
    }
  }

  async function sendMessage(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey && newMessage.trim()) {
      try {
        await axios.post(
          BACKEND_URL + "/chats",
          { message: newMessage },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setNewMessage("");
        await fetchChats();
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <Message key={index} senderName={msg.username} text={msg.message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={sendMessage}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Press Enter to send message..."
        />
      </div>
    </div>
  );
}
