import React, { useState } from "react";

import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // Import the delete icon


const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    setChatHistory((prev) => [...prev, `You: ${message}`]);
    setIsLoading(true);


    try {
      const response = await axios.post("/api/chat", { userMessage: message });

      setChatHistory((prev) => [...prev, `AI Advisor: ${response.data.message}`]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [...prev, "AI Advisor: Sorry, there was an error processing your request."]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
      ]);
    }, 1000);

    setMessage("");

  };

  const handleClearChat = () => {
    setChatHistory([]);
  };

  return (

    

    <section id="chat" className="bg-white p-8 shadow-xl rounded-2xl mb-12">
      <h3 className="text-2xl font-bold text-indigo-600 mb-4">
        💬 Chat with Your AI Advisor
      </h3>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Ask for financial advice, budget tips, or help with planning. Start typing or use voice commands!
      </p>

      {/* Chat History */}
      <div className="relative bg-gray-100 p-4 rounded-lg h-64 mb-6 overflow-y-auto">
        {/* Delete Icon to clear chat */}
        <button
          onClick={handleClearChat}
          className="absolute top-4 right-4 text-red-500"
        >
          <FaTrashAlt size={20} />
        </button>

        {chatHistory.length > 0 ? (
          chatHistory.map((chat, index) => (
            <p key={index} className="mb-2 text-gray-800">
              {chat}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        )}
        {isLoading && <p className="text-gray-500">AI Advisor is typing...</p>}
      </div>

      {/* Chat Input */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Ask a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        />
        <button
          onClick={handleSendMessage}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default ChatInterface;
