import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const UpdateSale = () => {
     const [sale, setSale] = useState({
          sale_date: '',
          product_id: '',
          quantity_sold: '',
          total_price: '',
     });
     const navigate = useNavigate();
     const { id } = useParams();

     useEffect(() => {
          axios.get(`http://localhost:4001/Sales/getSale/${id}`)
               .then(response => {
                    setSale(response.data);
               })
               .catch(error => {
                    console.error(error);
               });
     }, [id]);



     const handleChange = (e) => {
          const { name, value } = e.target;
          setSale({ ...sale, [name]: value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.put(`http://localhost:4001/Sales/updateSale/${id}`, sale);
               console.log(response.data);
               alert('Sale updated successfully!');
               navigate('/Sales');
          } catch (error) {
               console.error(error);
               alert('Error updating sale!');
          }
     };

     return (
          <div className="container mx-auto px-4">
               <h1 className="text-2xl font-bold text-center my-4">Update Sale</h1>
               <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                         <label className="block text-gray-700">Sale Date</label>
                         <input type="date" name="sale_date" value={sale.sale_date} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Product ID</label>
                         <input type="text" name="product_id" value={sale.product_id} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Quantity</label>
                         <input type="number" name="quantity_sold" value={sale.quantity_sold} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Total Amount</label>
                         <input type="number" name="total_price" value={sale.total_price} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update Sale</button>
               </form>
          </div>
     );
};

export default UpdateSale;