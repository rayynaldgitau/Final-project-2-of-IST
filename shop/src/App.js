import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate // Import Navigate for redirection
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Dashboard from './pages/DashboardPage';
import InventoryPage from './pages/inventoryPage';
import UpdateInventory from './pages/EditInventory';
import AddInventory from './pages/AddInventoryForm';
import SalesPage from './pages/salesPage';
import AddSales from './pages/AddSales';
import UpdateSale from './pages/editSales';
import ProductsPage from './pages/productsPage';
import MakeSale from './pages/makeSale';
import AddProduct from './pages/AddProducts';
import UpdateProduct from './pages/editProducts';
import SuppliersPage from './pages/suppliersPage';
import AddSupplier from './pages/AddSupplier';
import UpdateSupplier from './pages/editSupplier';
import ForgotPassword from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPasswordPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Redirect from the root path to the login page */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/:id/update" element={<UpdateInventory />} />
          <Route path="/inventory/add" element={<AddInventory />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/sales/add" element={<AddSales />} />
          <Route path="/sales/:id/update" element={<UpdateSale />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/makeSale" element={<MakeSale />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/:id/update" element={<UpdateProduct />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/supplier/add" element={<AddSupplier />} />
          <Route path="/supplier/:id/update" element={<UpdateSupplier />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
