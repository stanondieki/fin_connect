import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const FinancialChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      
      const botMessage = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "Something went wrong. Try again!" }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="p-3 rounded-full shadow-lg relative">
          <span className="absolute -top-6 -left-8 bg-white text-gray-700 text-xs px-2 py-1 rounded-md shadow-md">
            👋 Hi?
          </span>
          <MessageSquare size={24} />
        </Button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        >
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white">
            <span>Financial Connect Assistant</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </Button>
          </div>
          <CardContent className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`text-sm p-2 rounded-md ${msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800 self-start"}`}>
                {msg.content}
              </div>
            ))}
          </CardContent>
          <div className="p-2 border-t border-gray-200 flex">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about finance..."
              className="flex-1 text-black"
            />
            <Button onClick={sendMessage} disabled={loading} className="ml-2">
              {loading ? "..." : "Send"}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FinancialChatbot;
