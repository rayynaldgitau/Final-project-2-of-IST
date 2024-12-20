import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import { calculateTotalAmount } from '../components/utils';

const SalesList = () => {
     const [sales, setSales] = useState([]);
     const [products, setProducts] = useState([]); // New state for products
     const [totalAmount, setTotalAmount] = useState(0);

     useEffect(() => {
          fetchSales();
          fetchProducts(); // Fetch products data as well
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

     const fetchProducts = async () => {
          try {
               const response = await axios.get('http://localhost:4001/Products/getProducts');
               setProducts(response.data); // Store products in state
          } catch (error) {
               console.error("There was an error fetching the products!", error);
          }
     };


     // Function to delete products
     // const handleDelete = async (id) => {
     //      try {
     //           await axios.delete(`http://localhost:4001/sales/deleteSale/${id}`);
     //           const updatedSales = sales.filter(sale => sale.sales_id !== id);
     //           setSales(updatedSales);
     //           const newTotalAmount = calculateTotalAmount(updatedSales);
     //           setTotalAmount(newTotalAmount);
     //      } catch (error) {
     //           console.error("There was an error deleting the sale!", error);
     //      }
     // };

     // Helper function to get the product name by ID
     const getProductName = (productId) => {
          const product = products.find(p => p.product_id === productId);
          return product ? product.productName : 'Unknown Product';
     };

     return (
          <>
               <NavBar />
               <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sales</h2>
                    <table className="min-w-full bg-white my-10">
                         <thead>
                              <tr>

                                   <th className="py-2">Product Name</th> {/* Changed from Product ID */}
                                   <th className="py-2">Quantity Sold</th>
                                   <th className="py-2">Sale Date</th>
                                   <th className="py-2">Total Price</th>

                              </tr>
                         </thead>
                         <tbody>
                              {sales.map(sale => (
                                   <tr key={sale.sales_id}>
                                        {/* <td className="border px-4 py-4">{sale.sales_id}</td> */}
                                        <td className="border px-4 py-4">{getProductName(sale.product_id)}</td> {/* Product Name */}
                                        <td className="border px-4 py-4">{sale.quantity_sold}</td>
                                        <td className="border px-4 py-4">{sale.sale_date}</td>
                                        <td className="border px-4 py-4">{sale.total_price}</td>

                                   </tr>
                              ))}
                         </tbody>
                         <Link to="/makeSale" className="float-right">
                              <button className="bg-green-500 text-white px-4 py-2 rounded my-5">Add Sales</button>
                         </Link>
                    </table>
                    <div className="mt-5">
                         <p className="text-lg font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
                    </div>
               </div>
          </>
     );
};

export default SalesList;