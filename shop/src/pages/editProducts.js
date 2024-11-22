import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/navbar';

const EditProductsPage = () => {
     const { productId } = useParams(); // Get the product ID from the URL
     const navigate = useNavigate(); // To navigate back after update
     const [product, setProduct] = useState({
          productName: '',
          productQuantity: 0,
          productPrice: 0,
     });

     const [loading, setLoading] = useState(true); // For loading state
     const [error, setError] = useState(null); // For error state

     // Fetch product data by ID when the component loads
     useEffect(() => {
          axios.get(`http://localhost:4001/Products/getProduct/${productId}`)
               .then((response) => {
                    const { productName, productQuantity, price } = response.data;
                    setProduct({
                         productName,
                         productQuantity,
                         productPrice: price,
                    });
                    setLoading(false);
               })
               .catch((err) => {
                    setError('Failed to fetch product details');
                    setLoading(false);
               });
     }, [productId]);

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setProduct((prevState) => ({
               ...prevState,
               [name]: value,
          }));
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          // Send updated product data to the server
          axios.put(`http://localhost:4001/Products/updateProduct/${productId}`, {
               productName: product.productName,
               productQuantity: product.productQuantity,
               price: product.productPrice,
          })
               .then(() => {
                    alert('Product updated successfully!');
                    navigate('/products'); // Navigate back to products page
               })
               .catch((err) => {
                    console.error('Error updating product:', err);
                    alert('Failed to update product');
               });
     };

     if (loading) return <p>Loading product details...</p>;
     if (error) return <p className="text-red-500">{error}</p>;

     return (
          <>
               <NavBar />
               <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                    <form onSubmit={handleSubmit}>
                         {/* Product Name */}
                         <div className="mb-4">
                              <label className="block text-gray-700 font-bold mb-2" htmlFor="productName">
                                   Product Name
                              </label>
                              <input
                                   type="text"
                                   id="productName"
                                   name="productName"
                                   value={product.productName}
                                   onChange={handleInputChange}
                                   className="w-full p-2 border rounded"
                                   required
                              />
                         </div>



                         {/* Product Quantity */}
                         <div className="mb-4">
                              <label className="block text-gray-700 font-bold mb-2" htmlFor="productQuantity">
                                   Quantity
                              </label>
                              <input
                                   type="number"
                                   id="productQuantity"
                                   name="productQuantity"
                                   value={product.productQuantity}
                                   onChange={handleInputChange}
                                   className="w-full p-2 border rounded"
                                   required
                              />
                         </div>

                         {/* Product Price */}
                         <div className="mb-4">
                              <label className="block text-gray-700 font-bold mb-2" htmlFor="productPrice">
                                   Price
                              </label>
                              <input
                                   type="number"
                                   id="productPrice"
                                   name="productPrice"
                                   value={product.productPrice}
                                   onChange={handleInputChange}
                                   className="w-full p-2 border rounded"
                                   required
                              />
                         </div>

                         {/* Submit Button */}
                         <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                         >
                              Update Product
                         </button>
                    </form>
               </div>
          </>
     );
};

export default EditProductsPage;



