import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSales = () => {
     const [product_id, setSalesId] = useState('');
     const [quantity_sold, setQuantitySold] = useState('');
     const [sale_date, setSaleDate] = useState('');
     const [total_price, setTotalPrice] = useState('');
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          const saleData = {
               product_id,
               quantity_sold,
               sale_date,
               total_price
          };

          try {
               await axios.post('http://localhost:4001/Sales/addSale', saleData);
               navigate('/sales');
          } catch (error) {
               console.error("There was an error adding the sale!", error);
          }
     };

     return (
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
               <h2 className="text-2xl font-bold mb-4">Add Sale</h2>
               <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                         <label className="block text-gray-700">Product ID</label>
                         <input
                              type="number"
                              value={product_id}
                              onChange={(e) => setSalesId(e.target.value)}
                              className="w-full px-4 py-2 border rounded"
                              required
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Quantity Sold</label>
                         <input
                              type="number"
                              value={quantity_sold}
                              onChange={(e) => setQuantitySold(e.target.value)}
                              className="w-full px-4 py-2 border rounded"
                              required
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Sale Date</label>
                         <input
                              type="date"
                              value={sale_date}
                              onChange={(e) => setSaleDate(e.target.value)}
                              className="w-full px-4 py-2 border rounded"
                              required
                         />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Total Price</label>
                         <input
                              type="number"
                              step="0.01"
                              value={total_price}
                              onChange={(e) => setTotalPrice(e.target.value)}
                              className="w-full px-4 py-2 border rounded"
                              required
                         />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                         Add Sale
                    </button>
               </form>
          </div>
     );
};

export default AddSales;
