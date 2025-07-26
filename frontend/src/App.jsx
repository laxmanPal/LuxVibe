import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
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
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/EditProduct";
import AllCategories from "./pages/admin/AllCategories";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "categories", element: <Categories /> },
      { path: "category/:categoryName", element: <Category /> },
      { path: "product/:productId", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      {
        path: "myaccount",
        element: <MyAccount />,
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "mywishlist", element: <MyWishlist /> },
          { path: "myorders", element: <MyOrders /> },
          { path: "myaddresses", element: <MyAddresses /> },
          { path: "details", element: <AccountDetails /> },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "products", element: <AllProducts /> },
      { path: "create-product", element: <CreateProduct /> },
      { path: "edit-product/:productId", element: <EditProduct /> },
      { path: "categories", element: <AllCategories /> },
      { path: "users", element: <Users /> },
      { path: "orders", element: <Orders /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
