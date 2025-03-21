import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // For icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <a href="/" className="flex items-center text-lg font-bold text-gray-900">
          CollabSpace
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <a href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Dashboard
          </a>
          <a href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Login
          </a>
          <a href="/register" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Register
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {menuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-lg mt-2 p-4">
          <a href="/" className="block text-gray-700 py-2 hover:text-blue-600">
            Dashboard
          </a>
          <a href="/login" className="block text-gray-700 py-2 hover:text-blue-600">
            Login
          </a>
          <a href="/register" className="block text-gray-700 py-2 hover:text-blue-600">
            Register
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
