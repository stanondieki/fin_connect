import React from "react";
import Head from "next/head";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>AI_Financial Advisor</title>
        <meta
          name="description"
          content="Personalized financial advice, budget tracking, and money management tips powered by AI."
        />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">AI Financial Advisor</h1>
          <nav className="space-x-4">
            <Link
              href="#chat"
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Chatbot
            </Link>
            <Link
              href="#budget"
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Budget Tracker
            </Link>
            <Link
              href="#voice"
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Voice Commands
            </Link>
          </nav>
        </header>

        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">
            Take Control of Your Finances
          </h2>
          <p className="text-lg text-gray-700">
            Get personalized advice, track your budget, and make informed financial decisions with ease.
          </p>
        </section>

        {/* Chatbot Section */}
        <section
          id="chat"
          className="bg-white p-6 shadow-lg rounded-lg mb-12"
        >
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            💬 Chat with Your AI Advisor
          </h3>
          <p className="text-gray-700 mb-6">
            Ask for financial advice, budget tips, or help with planning. Start typing or use voice commands!
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700">
              Send
            </button>
          </div>
        </section>

        {/* Budget Tracker Section */}
        <section
          id="budget"
          className="bg-white p-6 shadow-lg rounded-lg mb-12"
        >
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            📊 Budget Tracker
          </h3>
          <p className="text-gray-700 mb-6">
            Keep track of your income and expenses. Get real-time insights into your spending habits.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Income:
              </label>
              <input
                type="number"
                placeholder="Enter your monthly income"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Expenses:
              </label>
              <input
                type="number"
                placeholder="Enter your monthly expenses"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700"
            >
              Update Budget
            </button>
          </form>
        </section>

        {/* Voice Command Section */}
        <section
          id="voice"
          className="bg-white p-6 shadow-lg rounded-lg mb-12"
        >
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            🎙️ Voice Commands
          </h3>
          <p className="text-gray-700 mb-6">
            Use your voice to interact with the chatbot. Enable microphone access to start.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700">
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
