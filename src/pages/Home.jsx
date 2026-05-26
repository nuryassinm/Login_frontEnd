import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({ user, setUser }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto p-8'>
        {user ? (
          // Logged in view - Show welcome message with username
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="mb-4">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-3xl text-white font-bold">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {user.username}! 🎉
            </h1>
            <p className="text-gray-600 mb-4">
              We're happy to see you again!
            </p>
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-500">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            {/* Logout Button */}
            <div className="mt-6">
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            </div>
          </div>
        ) : (
          // Not logged in view
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to My App
            </h1>
            <p className="text-gray-600 mb-8">
              Please login or register to continue
            </p>
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition inline-block"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition inline-block"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home