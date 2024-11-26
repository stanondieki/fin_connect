import React from "react";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>AI Financial Advisor</title>
        <meta
          name="description"
          content="Personalized financial advice, budget tracking, and money management tips powered by AI."
        />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg">
            Take Control of Your Finances
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Get personalized advice, track your budget, and make informed financial decisions with ease.
          </p>
        </section>

        {/* Chatbot Section */}
        <section id="chat" className="bg-white p-8 shadow-xl rounded-2xl mb-12">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            💬 Chat with Your AI Advisor
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Ask for financial advice, budget tips, or help with planning. Start typing or use voice commands!
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">
              Send
            </button>
          </div>
        </section>

        {/* Budget Tracker Section */}
        <section id="budget" className="bg-white p-8 shadow-xl rounded-2xl mb-12">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            📊 Budget Tracker
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Keep track of your income and expenses. Get real-time insights into your spending habits.
          </p>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Income:
              </label>
              <input
                type="number"
                placeholder="Enter your monthly income"
                className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Expenses:
              </label>
              <input
                type="number"
                placeholder="Enter your monthly expenses"
                className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Update Budget
            </button>
          </form>
        </section>

        {/* Voice Command Section */}
        <section id="voice" className="bg-white p-8 shadow-xl rounded-2xl mb-12">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            🎙️ Voice Commands
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Use your voice to interact with the chatbot. Enable microphone access to start.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
            Start Voice Input
          </button>
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
