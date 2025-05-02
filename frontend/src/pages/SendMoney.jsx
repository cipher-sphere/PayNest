import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Appbar from '../components/Appbar';

function SendMoney() {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
        alert("Failed to load user details");
        navigate("/dashboard");
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  const handleSend = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: userId,
          amount: Number(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Transfer successful");
      setAmount('');
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Transfer failed";
      alert(message);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="container mx-auto mt-8 p-4">
        <button 
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 mb-4 flex items-center"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Send Money</h2>
          
          {loading ? (
            <p>Loading user details...</p>
          ) : user ? (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Recipient</h3>
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-600">{user.username}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="amount">Amount (₹)</label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              
              <button
                onClick={handleSend}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                disabled={!amount}
              >
                Send Money
              </button>
            </div>
          ) : (
            <p className="text-red-600">User not found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendMoney;