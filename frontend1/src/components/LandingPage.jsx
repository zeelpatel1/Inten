import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">CollabTool</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your go-to platform for seamless real-time collaboration.
          Work together on documents, share ideas, and communicate effortlessly.
        </p>
        <hr className="my-6 border-gray-200" />
        <p className="text-md text-gray-500 mb-8">
          Whether you're working on a team project or organizing your thoughts, CollabTool gives you all the tools you need to stay productive and in sync.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="no-underline bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="no-underline bg-gray-200 text-gray-800 px-6 py-3 rounded-xl text-lg font-medium hover:bg-gray-300 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
