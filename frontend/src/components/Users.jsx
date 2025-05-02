import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SendMoney from '../components/SendMoney';
import Appbar from '../components/Appbar';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      
      try {
        const response = await axios.get("https://paynest-backend-h1dc.onrender.com/api/v1/user/bulk", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-xl font-semibold mb-4">Send Money</h2>
        
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="space-y-4">
            {users.length > 0 ? (
              users.map(user => (
                <SendMoney key={user._id} user={user} />
              ))
            ) : (
              <p className="text-gray-600">No users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;