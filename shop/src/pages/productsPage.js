import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
     const [products, setProducts] = useState([]);
     const [error, setError] = useState(null);

     useEffect(() => {
          fetchProducts();
     }, []);

     const fetchProducts = async () => {
          try {
               const response = await axios.get('http://localhost:4001/Products/getProducts');
               setProducts(response.data);
          } catch (error) {
               console.error('Error fetching products:', error);
               setError('Error fetching products');
          }
     };

     const handleDelete = async (id) => {
          try {
               await axios.delete(`http://localhost:4001/Products/deleteProduct/${id}`);
               setProducts(products.filter(product => product.product_id !== id));
          } catch (error) {
               console.error("There was an error deleting the product!", error);
          }
     };

     if (error) {
          return <div className="text-center mt-10 text-red-500">{error}</div>;
     }

     return (
          <>
               <NavBar />
               <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-center my-4">Products</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                         {products.map(product => (
                              <div key={product.product_id} className="bg-white rounded-md shadow-md p-4">
                                   <h2 className="text-lg font-bold">{product.productName}</h2>
                                   <p className="text-gray-700">{product.productDescription}</p>
                                   <div className="flex justify-between mt-2">
                                        <p className="text-gray-700">{product.productCategory}</p>
                                        <p className="text-gray-700">{product.price}.ksh</p>
                                   </div>
                                   <p className="text-gray-700">Quantity: {product.productQuantity}</p>
                                   <Link
                                        to={`/product/${product.product_id}/update`}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 my-5"
                                   >
                                        Edit
                                   </Link>
                                   <button
                                        onClick={() => handleDelete(product.product_id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded my-5"
                                   >
                                        Delete
                                   </button>
                              </div>
                         ))}
                    </div>
                    <Link to="/product/add" className="float-left my-5">
                         <button className="bg-green-500 text-white px-4 py-2 rounded">Add Product</button>
                    </Link>
               </div>
          </>
     );
};

export default ProductsPage;



