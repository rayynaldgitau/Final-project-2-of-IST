import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import { Link } from 'react-router-dom';

const SuppliersPage = () => {
     const [suppliers, setSuppliers] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [itemCount, setItemCount] = useState(0);

     useEffect(() => {



          const fetchSuppliers = async () => {
               try {
                    const response = await axios.get('http://localhost:4001/Suppliers/getSuppliers');
                    setSuppliers(response.data);
                    setLoading(false);
                    setItemCount(response.data.length);
               } catch (error) {
                    setError(error.message);
                    setLoading(false)

               }
          };

          fetchSuppliers();
     }, []);

     const handleDelete = async (id) => {
          try {
               await axios.delete(`http://localhost:4001/Suppliers/deleteSupplier/${id}`);
               setSuppliers(suppliers.filter(supplier => supplier.supplier_id !== id));
               setItemCount(itemCount - 1);
          } catch (error) {
               console.error("There was an error deleting the supplier!", error);
          }
     };

     if (loading) return <div className="text-center mt-10">loading...</div>
     if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;



     return (
          <>
               <NavBar />
               <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-center my-4">Suppliers</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                         {suppliers.map(supplier => (
                              <div key={supplier.supplier_id} className="bg-white rounded-md shadow-md p-4">
                                   <h2 className="text-lg font-bold">{supplier.name}</h2>
                                   <p className="text-gray-700">{supplier.email}</p>
                                   <p className="text-gray-700">{supplier.phone}</p>
                                   <Link
                                        to={`/supplier/${supplier.supplier_id}/update`}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 my-5"
                                   >
                                        Edit
                                   </Link>
                                   <button
                                        onClick={() => handleDelete(supplier.supplier_id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded my-5"
                                   >
                                        Delete
                                   </button>
                              </div>
                         ))}
                    </div>
                    <Link to="/supplier/add" className="float-left my-5">
                         <button className="bg-green-500 text-white px-4 py-2 rounded">Add Supplier</button>
                    </Link>
               </div>
          </>
     );
};

export default SuppliersPage;
