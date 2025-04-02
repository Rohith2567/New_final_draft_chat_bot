import React, { useState } from "react";
import axios from "axios";

const Chatbot = ({ product }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userId, setUserId] = useState("user123"); 

  const sendMessage = async () => {
    if (!message) return;

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        user_id: userId,
        message: message,
      });

      const reply = response.data.reply;
      const price = response.data.current_final_price;

      setChatHistory([
        ...chatHistory,
        { role: "You", text: message },
        { role: "Bot", text: `${reply} (Price: $${price})` },
      ]);
      setMessage("");
    } catch (error) {
      alert("Chat error: " + error.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div className="chatbot-container">
      <h3>Chat with our Bot about {product?.name}</h3>
      <div className="chatbox">
        {chatHistory.map((msg, index) => (
          <p key={index} className={msg.role === "You" ? "user-message" : "bot-message"}>
            <strong>{msg.role}: </strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about this product..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
