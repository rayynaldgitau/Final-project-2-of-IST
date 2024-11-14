import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';

const ProductsPage = () => {
     const [products, setProducts] = useState([]);
     const [productCount, setProductCount] = useState(0);  // State to hold the product count

     useEffect(() => {
          // Fetch updated product data (to reflect quantity changes)
          axios.get('http://localhost:4001/Products/getProducts')
               .then(response => {
                    setProducts(response.data);  // Assuming response is an array of products
                    setProductCount(response.data.length);  // Update product count
               })
               .catch(error => {
                    console.error('Error fetching products:', error);
               });
     }, []);

     return (
          <>
               <NavBar />
               <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <div className="flex justify-between items-center mb-6">
                         <h2 className="text-2xl font-bold">Product List</h2>

                         {/* Add Product Button */}
                         <Link to="/product/add" className="float-right">
                              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                                   Add Product
                              </button>
                         </Link>
                    </div>

                    {/* Display Product Count */}
                    <div className="text-lg font-semibold mb-4">
                         Total Products: {productCount}
                    </div>

                    <ul className="space-y-4">
                         {products.map(product => (
                              <li key={product.product_id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
                                   <span className="text-lg font-semibold">{product.productName}</span>
                                   <span className="text-sm text-gray-600">Quantity: {product.productQuantity}</span>
                              </li>
                         ))}
                    </ul>
               </div>
          </>
     );
};

export default ProductsPage;



