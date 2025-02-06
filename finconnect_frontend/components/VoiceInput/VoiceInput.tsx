import React, { useState } from "react";
import { FaTrashAlt, FaBars } from "react-icons/fa";
import Head from "next/head";

const Home = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [voiceInput, setVoiceInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition. Please try another browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      setVoiceInput(transcript);

      if (event.results[0].isFinal) {
        if (transcript.trim() !== "") {
          setChatHistory((prev) => [...prev, `You: ${transcript}`]);

          setTimeout(() => {
            setChatHistory((prev) => [
              ...prev,
              `AI Advisor: I’m here to assist with your financial questions!`,
            ]);
          }, 1000);

          setVoiceInput("");
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended.");
    };

    setTimeout(() => {
      recognition.stop();
    }, 5000);

    recognition.start();
  };

  const handleClearChat = () => {
    setChatHistory([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
     
      <Head>
        <title>AI Financial Advisor</title>
      </Head>
      
      <main className="min-h-screen w-full">
        <section id="chat" className="bg-white p-8 shadow-xl rounded-2xl mb-12 w-full">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            🎙️ Voice Commands
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Use your voice to interact with the chatbot. Enable microphone access to start.
          </p>

          {/* Chat History */}
          <div className="relative bg-gray-100 p-4 rounded-lg h-64 mb-6 overflow-y-auto">
            {/* Delete Icon to clear chat */}
            <button
              onClick={handleClearChat}
              className="absolute top-4 right-4 z-20 text-red-500"
              aria-label="Clear Chat History"
            >
              <FaTrashAlt size={20} />
            </button>

            {/* Sidebar Trigger */}
            {chatHistory.some((chat) => chat.startsWith("AI Advisor:")) && (
              <button
                onClick={toggleSidebar}
                className="absolute top-4 left-4 z-20 text-indigo-600"
                aria-label="Open Sidebar"
              >
                <FaBars size={24} />
              </button>
            )}

            {chatHistory.length > 0 ? (
              chatHistory.map((chat, index) => (
                <p key={index} className="mb-2 text-gray-800">
                  {chat}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            )}

            {/* Sidebar */}
            {isSidebarOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-10">
                <div className="bg-white w-64 h-full p-4">
                  <h4 className="font-bold text-xl mb-4">AI Requests</h4>
                  <ul className="space-y-2">
                    {chatHistory
                      .filter((chat) => chat.startsWith("AI Advisor:"))
                      .map((chat, index) => (
                        <li key={index} className="text-gray-800">
                          {chat}
                        </li>
                      ))}
                  </ul>
                  <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-gray-600"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex flex-col sm:flex-row items-center sm:space-y-0 sm:space-x-4 space-y-4 w-full">
            <input
              type="text"
              placeholder="Ask a question..."
              value={voiceInput}
              onChange={(e) => setVoiceInput(e.target.value)}
              className="w-full sm:flex-1 text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <button
              onClick={startVoiceInput}
              className={`w-full sm:w-auto ${
                isListening ? "bg-green-600" : "bg-indigo-600"
              } text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300`}
            >
              {isListening ? "Listening..." : "Start Voice Input"}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 mt-12">
          <p>© 2024 AI Financial Advisor. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
};

export default Home;
