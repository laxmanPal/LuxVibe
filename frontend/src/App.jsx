import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/client/Home";
import Shop from "./pages/client/Shop";
import Categories from "./pages/client/Categories";
import ProductDetails from "./pages/client/ProductDetails";
import Login from "./pages/auth/Login";
import ClientLayout from "./layouts/ClientLayout";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";
import Cart from "./pages/client/Cart";
import Dashboard from "./pages/client/Dashboard";
import MyAccount from "./components/client/MyAccount";
import MyWishlist from "./pages/client/MyWishlist";
import MyOrders from "./pages/client/MyOrders";
import MyAddresses from "./pages/client/MyAddresses";
import AccountDetails from "./pages/client/AccountDetails";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllProducts from "./pages/admin/AllProducts";
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/EditProduct";
import AllCategories from "./pages/admin/AllCategories";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import NotFound from "./pages/NotFound";
import Category from "./pages/client/Category";

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
