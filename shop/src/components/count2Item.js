import { useEffect, useState } from 'react';
import axios from 'axios';

const useItem2Count = () => {
     const [item2Count, setItem2Count] = useState(0);

     useEffect(() => {
          const fetchInventories = async () => {
               try {
                    const response = await axios.get('http://localhost:4001/Inventories/getInventories');
                    setItem2Count(response.data.data.length);
               } catch (error) {
                    console.log(error);
               }
          };

          fetchInventories();
     }, []);

     return item2Count;
};

export { useItem2Count };