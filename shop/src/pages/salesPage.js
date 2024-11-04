// SalesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import { calculateTotalAmount } from '../components/utils';

const SalesList = () => {
     const [sales, setSales] = useState([]);
     const [totalAmount, setTotalAmount] = useState(0);

     useEffect(() => {
          fetchSales();
     }, []);

     const fetchSales = async () => {
          try {
               const response = await axios.get('http://localhost:4001/Sales/getSales');
               setSales(response.data.data);
               const newTotalAmount = calculateTotalAmount(response.data.data);
               setTotalAmount(newTotalAmount);
          } catch (error) {
               console.error("There was an error fetching the sales!", error);
          }
     };

     const handleDelete = async (id) => {
          try {
               await axios.delete(`http://localhost:4001/sales/deleteSale/${id}`);
               const updatedSales = sales.filter(sale => sale.sales_id !== id);
               setSales(updatedSales);
               const newTotalAmount = calculateTotalAmount(updatedSales);
               setTotalAmount(newTotalAmount);
          } catch (error) {
               console.error("There was an error deleting the sale!", error);
          }
     };

     return (
          <>
               <NavBar />
               <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sales</h2>
                    <table className="min-w-full bg-white my-10">
                         <thead>
                              <tr>
                                   <th className="py-2">ID</th>
                                   <th className="py-2">Product ID</th>
                                   <th className="py-2">Quantity Sold</th>
                                   <th className="py-2">Sale Date</th>
                                   <th className="py-2">Total Price</th>
                                   <th className="py-2">Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {sales.map(sale => (
                                   <tr key={sale.sales_id}>
                                        <td className="border px-4 py-4">{sale.sales_id}</td>
                                        <td className="border px-4 py-4">{sale.product_id}</td>
                                        <td className="border px-4 py-4">{sale.quantity_sold}</td>
                                        <td className="border px-4 py-4">{sale.sale_date}</td>
                                        <td className="border px-4 py-4">{sale.total_price}</td>
                                        <td className="border px-4 py-4">
                                             <Link
                                                  to={`/sales/${sale.sales_id}/update`}
                                                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                             >
                                                  Edit
                                             </Link>
                                             <button
                                                  onClick={() => handleDelete(sale.sales_id)}
                                                  className="bg-red-500 text-white px-2 py-1 rounded"
                                             >
                                                  Delete
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                         <Link to="/sales/add" className="float-right">
                              <button className="bg-green-500 text-white px-4 py-2 rounded my-5">Add Sales</button>
                         </Link>
                         {/* <Link to="/makeSale">
                              <button className="bg-green-500 text-white px-4 py-2 rounded my-5">Make a sale</button>
                         </Link> */}
                    </table>
                    <div className="mt-5">
                         <p className="text-lg font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
                    </div>
               </div>
          </>
     );
};

export default SalesList;

