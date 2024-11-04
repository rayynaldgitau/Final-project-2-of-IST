import React, { useState } from 'react';
import axios from 'axios';

function MakeSale() {
     const [productId, setProductId] = useState('');
     const [quantitySold, setQuantitySold] = useState('');
     const [message, setMessage] = useState('');

     const handleSale = async () => {
          try {
               const response = await axios.post(`http://localhost:4001/Sales/makeSale`, {
                    productId,
                    quantitySold: parseInt(quantitySold)
               });

               setMessage(`Sale successful! Updated product: ${JSON.stringify(response.data)}`);
          } catch (error) {
               console.error('Error making sale:', error);
               setMessage('Sale failed. Please try again.');
          }
     };

     return (
          <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
               <h1 className="text-2xl font-bold mb-4">Make a Sale</h1>
               <input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Product ID"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
               />
               <input
                    type="number"
                    value={quantitySold}
                    onChange={(e) => setQuantitySold(e.target.value)}
                    placeholder="Quantity Sold"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
               />
               <button
                    onClick={handleSale}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
               >
                    Make Sale
               </button>
               <p className="mt-4 text-center">{message}</p>
          </div>
     );
}

export default MakeSale;
