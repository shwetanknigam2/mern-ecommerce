import React from 'react'

function Notfound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
    <div className="text-center p-8">
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mt-4">
        Oops! Page not found.
      </h2>
      <p className="text-lg text-gray-500 mt-4">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <div className="mt-8">
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </a>
      </div>
      <div className="mt-12">
        <img
          src="https://via.placeholder.com/500x300?text=Page+Not+Found"
          alt="404 Illustration"
          className="w-full max-w-md mx-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
  )
}

export default Notfound