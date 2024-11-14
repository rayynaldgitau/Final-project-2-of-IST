import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';

const MakeSale = () => {
     const [products, setProducts] = useState([]);
     const [selectedProduct, setSelectedProduct] = useState('');
     const [quantitySold, setQuantitySold] = useState('');
     const [price, setPrice] = useState('');
     const [saleDate, setSaleDate] = useState('');
     const [message, setMessage] = useState('');

     useEffect(() => {
          // Fetch the list of products when the component mounts
          axios.get('http://localhost:4001/Products/getProducts')
               .then(response => {
                    setProducts(response.data);  // Assuming response is an array of products
               })
               .catch(error => {
                    console.error('Error fetching products', error);
               });
     }, []);

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               // Make the sale and update the product quantity
               const response = await axios.post('http://localhost:4001/Sales/makeSale', {
                    product_id: selectedProduct,
                    quantity_sold: quantitySold,
                    total_price: price,
                    sale_date: saleDate
               });

               setMessage('Sale created successfully!');
               console.log(response.data);

               // After making the sale, re-fetch the products to reflect updated stock
               axios.get('http://localhost:4001/Products/getProducts')
                    .then(response => {
                         setProducts(response.data);  // Update products with new quantity
                    })
                    .catch(error => {
                         console.error('Error fetching products', error);
                    });
          } catch (error) {
               setMessage('Error creating sale.');
               console.error(error);
          }
     };

     return (
          <>
               <NavBar />
               <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Make a Sale</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                         {/* Product Selection */}
                         <div>
                              <label htmlFor="productId" className="block text-gray-700 font-medium">Product</label>
                              <select
                                   id="productId"
                                   value={selectedProduct}
                                   onChange={(e) => setSelectedProduct(e.target.value)}
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                   <option value="">Select a product</option>
                                   {products.map(product => (
                                        <option key={product.product_id} value={product.product_id}>
                                             {product.productName} - Quantity: {product.productQuantity}
                                        </option>
                                   ))}
                              </select>
                         </div>

                         {/* Quantity Sold Input */}
                         <div>
                              <label htmlFor="quantitySold" className="block text-gray-700 font-medium">Quantity Sold</label>
                              <input
                                   type="number"
                                   id="quantitySold"
                                   value={quantitySold}
                                   onChange={(e) => setQuantitySold(e.target.value)}
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                         </div>

                         {/* Price Input */}
                         <div>
                              <label htmlFor="price" className="block text-gray-700 font-medium">Price</label>
                              <input
                                   type="number"
                                   id="price"
                                   value={price}
                                   onChange={(e) => setPrice(e.target.value)}
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                         </div>

                         {/* Sale Date Input */}
                         <div>
                              <label htmlFor="saleDate" className="block text-gray-700 font-medium">Sale Date</label>
                              <input
                                   type="date"
                                   id="saleDate"
                                   value={saleDate}
                                   onChange={(e) => setSaleDate(e.target.value)}
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                         </div>

                         {/* Submit Button */}
                         <button
                              type="submit"
                              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                         >
                              Make Sale
                         </button>
                    </form>

                    {/* Message Display */}
                    {message && <p className="mt-4 text-center text-green-500">{message}</p>}
               </div>
          </>
     );
};

export default MakeSale;
