import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSupplier = () => {
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('');
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          const supplierData = {
               name,
               email,
               phone
          };

          try {
               await axios.post('http://localhost:4001/Suppliers/addSupplier', supplierData);
               navigate('/suppliers');
          } catch (error) {
               console.error("There was an error adding the supplier!", error);
          }
     };

     return (
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
               <h2 className="text-2xl font-bold mb-4">Add Supplier</h2>
               <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                         <label className="block text-gray-700">Name</label>
                         <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-4 py-2 border rounded"
                              required
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Email</label>
                         <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-2 border rounded"
                              required
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Phone</label>
                         <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-4 py-2 border rounded"
                              required
                         />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                         Add Supplier
                    </button>
               </form>
          </div>
     );
};

export default AddSupplier;
