import axios from 'axios';
export const updateInventory = async (id, inventory) => {
     try {
          const response = await axios.put(`http://localhost:4001/Inventories/updateInventory/${id}`, inventory);
          return response.data;
     } catch (error) {
          throw error;
     }
};