import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddProduct = () => {
     const [product, setProduct] = useState({
          productName: '',
          productQuantity: '',
          price: '',
     });

     const handleChange = (e) => {
          const { name, value } = e.target;
          setProduct({ ...product, [name]: value });
     };
     const navigate = useNavigate();
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post('http://localhost:4001/Products/addProduct', product);
               console.log(response.data);
               alert('Product added successfully!');
               navigate('/products'); // Call the callback function
          } catch (error) {
               console.error(error);
               alert('Error adding product!');
          }
     };

     return (
          <div className="container mx-auto px-4">
               <h1 className="text-2xl font-bold text-center my-4">Add Product</h1>
               <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                         <label className="block text-gray-700">Name</label>
                         <input type="text" name="productName" value={product.productName} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Quantity</label>
                         <input type="number" name="productQuantity" value={product.productQuantity} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Price</label>
                         <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
               </form>
          </div>
     );
};

export default AddProduct;


