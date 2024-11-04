import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from "../components/navbar";
// Adjust the path according to your project structure

const InventoryList = () => {
     const [inventories, setInventories] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [item2Count, setItem2Count] = useState(0); // Add a state variable to keep track of the item count

     useEffect(() => {
          const fetchInventories = async () => {
               try {
                    const response = await axios.get('http://localhost:4001/Inventories/getInventories');
                    setInventories(response.data.data); // Adjust based on your API response structure
                    setLoading(false);
                    setItem2Count(response.data.data.length); // Set the item count when the data is fetched
               } catch (error) {
                    setError(error.message);
                    setLoading(false);
               }
          };

          fetchInventories();
     }, []);

     const handleDelete = async (id) => {
          try {
               await axios.delete(`http://localhost:4001/inventories/deleteInventory/${id}`);
               setInventories(inventories.filter(inventory => inventory.inventory.id !== id));
               setItem2Count(item2Count - 1);
          } catch (error) {
               console.log(error);
          }
     }



     if (loading) return <div className="text-center mt-10">Loading...</div>;
     if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

     return (
          <>
               <NavBar />
               <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-center my-4">Inventory  items</h1>

                    <table className="min-w-full bg-white mt-4">
                         <thead>
                              <tr>
                                   <th className="py-2">Inventory ID</th>
                                   <th className="py-2">Name</th>
                                   <th className="py-2">Quantity</th>
                                   <th className="py-2">Warehouse</th>
                                   <th className="py-2">Location</th>
                                   <th className="py-2">Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {inventories.map((inventory) => (
                                   <tr key={inventory.id} className="text-center border-t">
                                        <td className="py-2">{inventory.inventory_id}</td>
                                        <td className="py-2">{inventory.name}</td>
                                        <td className="py-2">{inventory.quantity}</td>
                                        <td className="py-2">{inventory.warehouse}</td>
                                        <td className="py-2">{inventory.location}</td>
                                        <td className="py-2">
                                             <Link to={`/inventory/${inventory.id}/update`} className="bg-blue-500 text-white px-4 py-2 rounded mx-2">Update</Link>
                                             <button className="bg-red-500 text-white px-4 py-2 rounded mx-2" onClick={() => handleDelete(inventory.inventory_id)}>Delete</button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                         <Link to="/inventory/add" className="float-left my-5">
                              <button className="bg-green-500 text-white px-4 py-2 rounded">Add inventory</button>
                         </Link>
                    </table>
               </div>
          </>
     );
};

export default InventoryList;



