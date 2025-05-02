import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">PayNest</h1>
        <p className="text-center text-gray-300 mb-8">
          Secure payments made simple
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/signin"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-center font-medium transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white py-3 rounded-lg text-center font-medium transition-colors duration-200"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;