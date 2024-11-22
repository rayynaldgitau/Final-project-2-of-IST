import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';

const ProductsPage = () => {
     const [products, setProducts] = useState([]);
     const navigate = useNavigate(); // For navigation

     useEffect(() => {
          fetchProducts();
     }, []);

     const fetchProducts = () => {
          axios.get('http://localhost:4001/Products/getProducts')
               .then(response => {
                    setProducts(response.data);  // Assuming response is an array of products
               })
               .catch(error => {
                    console.error('Error fetching products:', error);
               });
     };

     const handleDelete = (id) => {
          if (window.confirm('Are you sure you want to delete this product?')) {
               axios.delete(`http://localhost:4001/Products/deleteProduct/${id}`)
                    .then(() => {
                         alert('Product deleted successfully!');
                         fetchProducts(); // Refresh product list after deletion
                    })
                    .catch(error => {
                         console.error('Error deleting product:', error);
                    });
          }
     };


     const handleEdit = (productId) => {
          navigate(`/editProduct/${productId}`); // Navigate to the EditProduct page
     };

     return (
          <>
               <NavBar />
               <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <div className="flex justify-between items-center mb-6">
                         <h2 className="text-2xl font-bold">Product List</h2>

                         {/* Add Product Button */}
                         <Link to="/product/add">
                              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                                   Add Product
                              </button>
                         </Link>
                    </div>

                    {/* Display Product Count */}
                    <div className="text-lg font-semibold mb-4">
                         Total Products: {products.length} {/* Dynamically update product count */}
                    </div>

                    <ul className="space-y-4">
                         {products.map(product => (
                              <li key={product.product_id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
                                   <div>
                                        <span className="text-lg font-semibold">{product.productName}</span>
                                        <span className="text-sm text-gray-600 ml-4">Quantity: {product.productQuantity}</span>
                                        {/* Display Price */}
                                        <span className="text-sm text-gray-600 ml-4">Price: ${product.price}</span>
                                   </div>
                                   <div className="flex space-x-2">
                                        {/* Edit Button */}
                                        <button
                                             onClick={() => handleEdit(product.product_id)}
                                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        >
                                             Edit
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                             onClick={() => handleDelete(product.product_id)}
                                             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                        >
                                             Delete
                                        </button>
                                   </div>
                              </li>
                         ))}
                    </ul>
               </div>
          </>
     );
};

export default ProductsPage;






