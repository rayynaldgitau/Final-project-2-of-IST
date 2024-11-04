import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSupplier = () => {
     const [supplier, setSupplier] = useState({
          name: '',
          email: '',
          phone: '',
     });
     const navigate = useNavigate();
     const { id } = useParams();

     useEffect(() => {
          axios.get(`http://localhost:4001/Suppliers/getSupplier/${id}`)
               .then(response => {
                    setSupplier(response.data);
               })
               .catch(error => {
                    console.error(error);
               });
     }, [id]);

     const handleChange = (e) => {
          const { name, value } = e.target;
          setSupplier({ ...supplier, [name]: value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.put(`http://localhost:4001/Suppliers/updateSupplier/${id}`, supplier);
               console.log(response.data);
               alert('Supplier updated successfully!');
               navigate('/suppliers');
          } catch (error) {
               console.error(error);
               alert('Error updating supplier!');
          }
     };

     return (
          <div className="container mx-auto px-4">
               <h1 className="text-2xl font-bold text-center my-4">Update Supplier</h1>
               <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                         <label className="block text-gray-700">Name</label>
                         <input type="text" name="name" value={supplier.name} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Email</label>
                         <input type="email" name="email" value={supplier.email} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Phone</label>
                         <input type="tel" name="phone" value={supplier.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update Supplier</button>
               </form>
          </div>
     );
};

export default UpdateSupplier;
