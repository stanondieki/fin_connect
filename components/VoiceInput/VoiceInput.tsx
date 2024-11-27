import React, { useState } from "react";
import Head from "next/head";

const Home = () => {
  const [voiceInput, setVoiceInput] = useState("");
  const [isListening, setIsListening] = useState(false);

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
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setVoiceInput(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended.");
    };

    recognition.start();
  };

  return (
    <>
     
      <main className="min-h-screen  p-6">
       
        <section id="chat" className="bg-white p-8 shadow-xl rounded-2xl mb-12">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            🎙️ Voice Commands
            </h3>         
            <p className="text-gray-700 mb-6 leading-relaxed">
            Use your voice to interact with the chatbot. Enable microphone access to start.
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Ask a question..."
              value={voiceInput}
              onChange={(e) => setVoiceInput(e.target.value)}
              className="flex-1 text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <button
              onClick={startVoiceInput}
              className={`${
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
