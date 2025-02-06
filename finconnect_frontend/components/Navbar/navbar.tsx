import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 shadow-lg p-4 rounded-xl mb-6 relative">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">
        AI Financial Advisor
      </h1>

      {/* Hamburger Menu Icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white text-2xl focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`absolute md:relative top-full left-0 w-full md:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 md:bg-transparent shadow-lg md:shadow-none md:flex items-center space-y-4 md:space-y-0 p-6 md:p-0 rounded-xl md:rounded-none ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          href="#chat"
          className="block text-white font-medium px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 transition-all duration-300"
        >
          Chatbot
        </Link>
        <Link
          href="#budget"
          className="block text-white font-medium px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 transition-all duration-300"
        >
          Budget Tracker
        </Link>
        <Link
          href="#voice"
          className="block text-white font-medium px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 transition-all duration-300"
        >
          Voice Commands
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
