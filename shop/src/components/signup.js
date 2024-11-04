import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
     const [formData, setFormData] = useState({ email: '', password: '' });
     const [message, setMessage] = useState('');
     const navigate = useNavigate();

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post('http://localhost:4001/api/auth/signup', formData);
               setMessage(response.data.message);
               navigate('/login');
          } catch (error) {
               setMessage(error.response?.data?.message || 'Error signing up');
          }
     };

     return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
               <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Signup</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                              <input
                                   type="email"
                                   name="email"
                                   placeholder="Email"
                                   onChange={handleChange}
                                   required
                                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                              />
                         </div>
                         <div>
                              <input
                                   type="password"
                                   name="password"
                                   placeholder="Password"
                                   onChange={handleChange}
                                   required
                                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                              />
                         </div>
                         <button
                              type="submit"
                              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                         >
                              Signup
                         </button>
                    </form>
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
               </div>
          </div>
     );
};

export default Signup;








