import React from "react";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-3xl text-center bg-white shadow-lg rounded-lg p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CollabTool</h1>
        
        {/* Subtext */}
        <p className="text-lg text-gray-700 mb-4">
          CollabTool is your go-to platform for seamless real-time collaboration.  
          Work together on documents, share ideas, and communicate effortlessly with your team.
        </p>
        
        {/* Horizontal Line */}
        <hr className="my-6 border-gray-300" />
        
        {/* Additional Info */}
        <p className="text-gray-600 mb-6">
          Whether you're working on a team project or just need to organize your thoughts,  
          CollabTool offers all the features you need to stay productive.
        </p>
        
        {/* Buttons */}
        <div className="mt-4 space-x-4">
          <a href="/register" className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition">
            Register
          </a>
          <a href="/login" className="px-6 py-3 text-lg font-medium text-gray-900 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 transition">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
