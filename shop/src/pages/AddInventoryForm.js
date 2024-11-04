import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddInventory = () => {
     const [inventory, setInventory] = useState({
          product_id: '',
          name: '',
          quantity: '',
          warehouse: '',
          location: ''
     });

     const navigate = useNavigate()

     const handleChange = (e) => {
          const { name, value } = e.target;
          setInventory({ ...inventory, [name]: value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post('http://localhost:4001/inventories/addInventory', inventory);
               console.log(response.data);
               alert('Inventory added successfully!');
               navigate('/Inventory');
          } catch (error) {
               console.error(error);
               alert('Error adding inventory!');
          }
     };

     return (
          <div className="container mx-auto px-4">
               <h1 className="text-2xl font-bold text-center my-4">Add Inventory</h1>
               <form onSubmit={handleSubmit} className="max-w-md mx-auto">

                    <div className="mb-4">
                         <label className="block text-gray-700">Name</label>
                         <input type="text" name="name" value={inventory.name} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Quantity</label>
                         <input type="number" name="quantity" value={inventory.quantity} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Warehouse</label>
                         <input type="text" name="warehouse" value={inventory.warehouse} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Location</label>
                         <input type="text" name="location" value={inventory.location} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Inventory</button>
               </form>
          </div>
     );
};

export default AddInventory;