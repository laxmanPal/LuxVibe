import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import ClientLayout from "./components/ClientLayout";
import AuthLayout from "./components/AuthLayout";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import MyAccount from "./components/MyAccount";
import MyWishlist from "./pages/MyWishlist";
import MyOrders from "./pages/MyOrders";
import MyAddresses from "./pages/MyAddresses";
import AccountDetails from "./pages/AccountDetails";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllProducts from "./pages/admin/AllProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myaccount" element={<MyAccount />}>
              <Route index element={<Dashboard />} />
              <Route path="mywishlist" element={<MyWishlist />} />
              <Route path="myorders" element={<MyOrders />} />
              <Route path="myaddresses" element={<MyAddresses />} />
              <Route path="details" element={<AccountDetails />} />
            </Route>
          </Route>
        </Routes>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="all-products" element={<AllProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
