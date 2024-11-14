PROBLEM STATEMENT.
To create an Inventory management system that can manage goods and sales of a given company

PROPOSED SOLUTION.

 1.Architecture Overview

-Frontend: React.js for building a responsive user interface.
-Backend: Node.js/Express.js to handle API requests and connect to the MySQL database.
- Database: MySQL to store and manage inventory data.

 2.Database Design

Design the MySQL database schema to manage goods and sales. Here are the primary tables you might need:

1. Users Table
   - `user_id` (INT, Primary Key, Auto Increment)
   - `username` (VARCHAR)
   - `password` (VARCHAR)
   - `role` (ENUM: 'admin', 'employee')

2. Products Table
   - `product_id` (INT, Primary Key, Auto Increment)
   - `productName` (VARCHAR)
      - `quantity` (INT)
   - `price` (DECIMAL)
   - `category` (VARCHAR)
   - `supplier_id` (INT, Foreign Key)

3. Suppliers Table
   - `supplier_id` (INT, Primary Key, Auto Increment)
   - `supplier_name` (VARCHAR)
   - `contact_info` (VARCHAR)
	
4. Sales Table
   - `sale_id` (INT, Primary Key, Auto Increment)
   - `product_id` (INT, Foreign Key)
   - `quantity_sold` (INT)
   - `sale_date` (DATETIME)
   - `total_price` (DECIMAL)

5. Inventory Transactions Table (optional for tracking inventory changes)
   - `transaction_id` (INT, Primary Key, Auto Increment)
   - `product_id` (INT, Foreign Key)
   - `change_type` (ENUM: 'addition', 'subtraction')
   - `quantity_changed` (INT)
   - `transaction_date` (DATETIME)

3. Backend Development

- Setup Node.js with Express:
  - Create a new Node.js project.
  - Install necessary packages: `express`, `mysql2`, `cors`, `dotenv` (for environment variables).
  
- Create API Endpoints:
  - User Authentication: For login and role-based access (admin/employee).
  - CRUD Operations for Products:
    - Create: Add a new product.
    - Read: Fetch product details.
    - Update: Modify existing product details.
    - Delete: Remove a product.
  - Sales Management:
    - Create: Record a new sale.
    - Read: Fetch sales history.
  
- Sample API Endpoints:
  - `POST /User/login` (for user authentication)
  - `GET /Products/products` (to retrieve products)
  - `POST /Products/products` (to add a product)
  - `PUT /Products/products/:id` (to update a product)
  - `DELETE /Products/products/:id` (to delete a product)
  - `POST /Sales/sales` (to record a sale)

 4. Frontend Development

- Setup React.js:
  - Create a new React app using `create-react-app`.
  - Install necessary libraries: `axios` (for API calls), `react-router-dom` (for routing), and any UI component library (like Material-UI or Bootstrap).

- Component Structure:
  - Login Component: For user authentication.
  - Dashboard Component: Displays a summary of inventory and sales.
  - Products Component: To manage products (list, add, edit, delete).
  - Sales Component: To manage sales transactions and view sales history.
  - User Management Component: For admin to manage users (optional).

- State Management:
  - Use React’s Context API or Redux for state management to handle authentication state and global data (like product list and sales).

-API Integration:
  - Use `axios` to make API calls to the backend and update the state accordingly.

5. Deployment

-Backend: Deploy the Node.js server using platforms like Heroku, DigitalOcean, or AWS.
-Frontend: Deploy the React app using platforms like Vercel, Netlify, or GitHub Pages.
- Database: Host the MySQL database on services like AWS RDS, Heroku Postgres, or DigitalOcean.

Conclusion

This proposed solution provides a clear structure for developing an Inventory Management System with a MySQL backend and React.js frontend. Each component is modular, making it easier to manage and extend functionality in the future. Ensure to implement security measures like data validation, authentication, and authorization to protect sensitive data and functionality.





![Screenshot 2024-11-14 124934](https://github.com/user-attachments/assets/9e792914-cbfb-4c00-8604-f8fb36c65abc)
![Screenshot 2024-11-14 124847](https://github.com/user-attachments/assets/bf51e213-bd3c-48f5-a3d5-3b58c0e9d9fe)
![Screenshot 2024-11-14 125056](https://github.com/user-attachments/assets/f9bee372-32cd-4b61-aaf5-585463a4dc3a)
![Screenshot 2024-11-14 125040](https://github.com/user-attachments/assets/96032559-171f-4b6a-9f96-a40f0a6067b4)
![Screenshot 2024-11-14 125023](https://github.com/user-attachments/assets/2c85ccf0-683c-427a-bb80-6dce8d10d197)
![Screenshot 2024-11-14 125008](https://github.com/user-attachments/assets/d923bbba-2592-4cd2-b8c6-943b83bf5ec5)
![Screenshot 2024-11-14 124949](https://github.com/user-attachments/assets/c7428a92-3b75-48fe-81d5-21ee5266d213)
