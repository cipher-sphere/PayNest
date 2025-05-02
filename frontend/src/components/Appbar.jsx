import React from 'react';
import { useNavigate } from 'react-router-dom';

function Appbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">PaymentApp</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate("/dashboard")}
            className="px-3 py-1 rounded hover:bg-gray-100"
          >
            Dashboard
          </button>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;