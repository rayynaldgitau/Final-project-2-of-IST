import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import { useItemCount } from '../components/countItem';
import { useItem2Count } from '../components/count2Item';
import { calculateTotalAmount } from '../components/utils';

function Dashboard() {
     const [totalAmount, setTotalAmount] = useState(0);
     const [productCount, setProductCount] = useState(0);  // State for product count
     const [userRole, setUserRole] = useState(null);  // State for user role
     const itemCount = useItemCount();
     const item2Count = useItem2Count();

     useEffect(() => {
          fetchSales();
          fetchProductCount();
          fetchUserRole();  // Fetch the user role when component mounts
     }, []);

     const fetchSales = async () => {
          try {
               const response = await axios.get('http://localhost:4001/Sales/getSales');
               const sales = response.data.data;
               const newTotalAmount = calculateTotalAmount(sales);
               setTotalAmount(newTotalAmount);
          } catch (error) {
               console.error("There was an error fetching the sales!", error);
          }
     };

     const fetchProductCount = async () => {
          try {
               const response = await axios.get('http://localhost:4001/Products/getProducts');
               setProductCount(response.data.length);  // Assuming response.data is an array of products
          } catch (error) {
               console.error("There was an error fetching the product count!", error);
          }
     };

     const fetchUserRole = () => {
          const token = localStorage.getItem('token');
          if (token) {
               const { role } = JSON.parse(atob(token.split('.')[1]));  // Decode JWT payload
               setUserRole(role);
          }
     };

     return (
          <>
               <NavBar />
               <div className="container mx-auto px-4">
                    <header className="bg-white shadow-md py-4 ">
                         <div className="container mx-auto p-4">
                              <h1 className="text-3xl font-bold text-center">Dashboard</h1>
                         </div>
                    </header>
                    <main className="flex-1 overflow-y-auto">
                         <div className="container mx-auto p-4">
                              <section className="mb-4">
                                   <h2 className="text-2xl font-bold">Overview</h2>
                                   <div className="flex flex-wrap -mx-4">
                                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                                             <div className="bg-white shadow-md p-4 rounded">
                                                  <h3 className="text-lg font-bold">Sales</h3>
                                                  <p className="text-gray-600">Total Amount: ${totalAmount.toFixed(2)} in sales</p>
                                             </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                                             <div className="bg-white shadow-md p-4 rounded">
                                                  <h3 className="text-lg font-bold">Suppliers</h3>
                                                  <p className="text-gray-600">{itemCount} Suppliers</p>
                                             </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                                             <div className="bg-white shadow-md p-4 rounded">
                                                  <h3 className="text-lg font-bold">Inventory Items</h3>
                                                  <p className="text-gray-600">{item2Count} Items</p>
                                             </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                                             <div className="bg-white shadow-md p-4 rounded">
                                                  <h3 className="text-lg font-bold">Total Products</h3>
                                                  <p className="text-gray-600">{productCount} Products</p>
                                             </div>
                                        </div>
                                        {userRole === 'admin' && (
                                             <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                                                  <div className="bg-white shadow-md p-4 rounded">
                                                       <h3 className="text-lg font-bold">Admin Panel</h3>
                                                       <p className="text-gray-600">
                                                            <a href="/verify-users" className="text-blue-600 hover:underline">Verify Users</a>
                                                       </p>
                                                  </div>
                                             </div>
                                        )}
                                   </div>
                              </section>
                         </div>
                    </main>
               </div>
          </>
     );
}

export default Dashboard;


