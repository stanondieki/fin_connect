import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 shadow-lg p-4 rounded-xl mb-6">
      <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">
        AI Financial Advisor
      </h1>
      <nav className="space-x-6">
        <Link
          href="#chat"
          className="text-white font-medium px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 transition-all duration-300"
        >
          Chatbot
        </Link>
        <Link
          href="#budget"
          className="text-white font-medium px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 transition-all duration-300"
        >
          Budget Tracker
        </Link>
        <Link
          href="#voice"
          className="text-white font-medium px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 transition-all duration-300"
        >
          Voice Commands
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
