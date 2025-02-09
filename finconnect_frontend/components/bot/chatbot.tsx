import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const [financialData, setFinancialData] = useState<{ budget: number; income: number; expenses: number; debts: number } | null>(null);

  useEffect(() => {
    // Fetch financial data from the database
    const fetchFinancialData = async () => {
      try {
        const response = await axios.get("/api/financial-data"); // Update with actual API endpoint
        setFinancialData(response.data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };
    fetchFinancialData();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an AI financial advisor." },
          { role: "user", content: input },
        ],
      }, {
        headers: {
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
          "Content-Type": "application/json",
        },
      });
      const botMessage = response.data.choices[0].message.content;

      setMessages((prev) => [...prev, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [...prev, { text: "Sorry, I couldn't process that.", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-row w-full p-4">
      {/* Chat UI */}
      <div className="flex flex-col w-2/3 max-w-md bg-white shadow-lg rounded-lg p-4">
        <div className="h-64 overflow-y-auto p-2 border-b flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "bot" && <img src="/bot/bot.jpg" alt="Bot" className="w-8 h-8 rounded-full mr-2" />}
              <div className={`p-2 my-1 rounded-lg w-fit max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"}`}>{msg.text}</div>
              {msg.sender === "user" && <img src="/profile/pro.jpg" alt="User" className="w-8 h-8 rounded-full ml-2" />}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <input type="text" className="flex-1 p-2 border rounded-l-lg focus:outline-none" placeholder="Ask me anything..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg" onClick={sendMessage}><Send className="w-5 h-5" /></button>
        </div>
      </div>
      
      {/* Financial Data Panel */}
      <div className="w-1/3 p-4 bg-gray-100 shadow-lg rounded-lg ml-4">
        <h2 className="text-lg font-bold mb-3">Financial Overview</h2>
        {financialData ? (
          <div className="space-y-3">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-600">Budget</h3>
              <p className="text-lg font-bold text-blue-600">${financialData.budget.toFixed(2)}</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-600">Income</h3>
              <p className="text-lg font-bold text-green-600">${financialData.income.toFixed(2)}</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-600">Expenses</h3>
              <p className="text-lg font-bold text-red-600">${financialData.expenses.toFixed(2)}</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="text-sm font-semibold text-gray-600">Debts</h3>
              <p className="text-lg font-bold text-red-500">${financialData.debts.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading financial data...</p>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
