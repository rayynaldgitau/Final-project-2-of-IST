

export const calculateTotalAmount = (sales) => {
     return sales.reduce((acc, sale) => acc + parseFloat(sale.total_price), 0);
};
