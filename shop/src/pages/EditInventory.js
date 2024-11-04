import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const UpdateInventory = () => {
     const [inventory, setInventory] = useState({
          product_id: '',
          name: '',
          quantity: '',
          warehouse: '',
          location: '',
     });
     const navigate = useNavigate();
     const { id } = useParams();

     useEffect(() => {
          axios.get(`http://localhost:4001/Inventories/getInventory/${id}`)
               .then(response => {
                    setInventory(response.data);
               })
               .catch(error => {
                    console.error(error);

               });
     }, [id]);

     const handleChange = (e) => {
          const { name, value } = e.target;
          setInventory({ ...inventory, [name]: value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.put(`http://localhost:4001/Inventories/updateInventory/${id}`, inventory);
               console.log(response.data);
               alert('Inventory updated successfully!');
               navigate('/inventory');
          } catch (error) {
               console.error(error);
               alert('Error updating inventory!');
          }
     };

     return (
          <div className="container mx-auto px-4">
               <h1 className="text-2xl font-bold text-center my-4">Update Inventory</h1>
               <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                         <label className="block text-gray-700">Product ID</label>
                         <input type="text" name="product_id" value={inventory.product_id} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
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
                    <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update Inventory</button>
               </form>
          </div>
     );
};

export default UpdateInventory;

