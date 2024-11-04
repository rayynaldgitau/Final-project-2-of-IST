import { useEffect, useState } from 'react';
import axios from 'axios';

const useItemCount = () => {
     const [itemCount, setItemCount] = useState(0);

     useEffect(() => {
          const fetchSuppliers = async () => {
               try {
                    const response = await axios.get('http://localhost:4001/Suppliers/getSuppliers');
                    setItemCount(response.data.length);
               } catch (error) {
                    console.log(error);
               }
          };

          fetchSuppliers();
     }, []);

     return itemCount;
};

export { useItemCount };