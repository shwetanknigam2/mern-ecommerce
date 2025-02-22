import React from 'react'
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "lucide-react";

function Paymentsuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800">Payment Successful!</h1>
      <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been placed.</p>

      <button
        onClick={() => navigate("/shopping/account")}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
      >
        Go to Orders
      </button>
    </div>
  );
}

export default Paymentsuccess