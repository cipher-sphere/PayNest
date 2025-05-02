import React from 'react';

function Balance({ value })  {
  return (
    <div className="bg-green-100 text-green-800 p-4 rounded shadow mb-6">
      <h2 className="text-lg">Your Balance</h2>
      <p className="text-2xl font-bold">₹{value}</p>
    </div>
  );
};

export default Balance