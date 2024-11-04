import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
     const { token } = useParams(); // Get the token from the URL
     const [password, setPassword] = useState('');
     const [message, setMessage] = useState('');

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post(`http://localhost:4001/api/auth/reset-password/${token}`, { password });
               setMessage(response.data.message);
          } catch (error) {
               setMessage(error.response?.data?.message || 'Error resetting password');
          }
     };

     return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
               <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Reset Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                              <input
                                   type="password"
                                   placeholder="New Password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                              />
                         </div>
                         <button
                              type="submit"
                              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                         >
                              Reset Password
                         </button>
                    </form>
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
               </div>
          </div>
     );
};

export default ResetPassword;

