import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const UpdateProduct = () => {
     const [product, setProduct] = useState({
          productName: '',
          price: '',
          productQuantity: '',
     });
     const navigate = useNavigate();
     const { id } = useParams();

     useEffect(() => {
          axios.get(`http://localhost:4001/Products/getProduct/${id}`)
               .then(response => {
                    setProduct(response.data);
               })
               .catch(error => {
                    console.error(error);
               });
     }, [id]);

     const handleChange = (e) => {
          const { name, value } = e.target;
          setProduct({ ...product, [name]: value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.put(`http://localhost:4001/Products/updateProduct/${id}`, product);
               console.log(response.data);
               alert('Product updated successfully!');
               navigate('/Products');
          } catch (error) {
               console.error(error);
               alert('Error updating product!');
          }
     };

     return (
          <div className="container mx-auto px-4">
               <h1 className="text-2xl font-bold text-center my-4">Update Product</h1>
               <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                         <label className="block text-gray-700">Product Name</label>
                         <input type="text" name="productName" value={product.productName} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Price</label>
                         <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                         <label className="block text-gray-700">Quantity</label>
                         <input type="number" name="productQuantity" value={product.productQuantity} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
                    </div>
                    <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update Product</button>
               </form>
          </div>
     );
};

export default UpdateProduct;
