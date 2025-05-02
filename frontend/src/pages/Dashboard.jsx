import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from '../components/Appbar';
import axios from 'axios';

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      
      try {
        // Fetch balance
        const balanceResponse = await axios.get("https://paynest-backend-h1dc.onrender.com/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setBalance(balanceResponse.data.balance);
        
        // Fetch users
        const usersResponse = await axios.get("https://paynest-backend-h1dc.onrender.com/api/v1/user/bulk", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUsers(usersResponse.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendMoney = (userId) => {
    navigate(`/send/${userId}`);
  };

  return (
    <div>
      <Appbar />
      <div className="container mx-auto mt-8 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Your Balance</h3>
          {loading ? (
            <p>Loading balance...</p>
          ) : (
            <div className="text-3xl font-bold">₹ {balance.toFixed(2)}</div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Users</h3>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="space-y-4">
              {users.length > 0 ? (
                users.map(user => (
                  <div key={user._id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-600">{user.username}</p>
                    </div>
                    <button
                      onClick={() => handleSendMoney(user._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Send Money
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No users found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;