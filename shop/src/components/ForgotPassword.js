import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
     const [email, setEmail] = useState('');
     const [message, setMessage] = useState('');
     const navigate = useNavigate();

     const handleChange = (e) => {
          setEmail(e.target.value);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post('http://localhost:4001/api/auth/forgot-password', { email });
               setMessage(response.data.message);
               // Optionally, navigate back to login page after requesting a reset
               navigate('/login');
          } catch (error) {
               setMessage(error.response?.data?.message || 'Error requesting password reset');
          }
     };

     return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
               <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Forgot Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                              <input
                                   type="email"
                                   name="email"
                                   placeholder="Enter your email"
                                   value={email}
                                   onChange={handleChange}
                                   required
                                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                              />
                         </div>
                         <button
                              type="submit"
                              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                         >
                              Send Reset Link
                         </button>
                    </form>
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
               </div>
          </div>
     );
};

export default ForgotPassword;

