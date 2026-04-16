import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user'); // Assume token/name stored on login

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏨 HotelBook
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-blue-600 font-medium transition">Wishlist</Link>
            <Link to="/history" className="text-gray-700 hover:text-blue-600 font-medium transition">History</Link>
            {user ? (
              <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-gray-200 text-gray-800 px-4 py-1 rounded-lg hover:bg-gray-300 transition font-medium">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

