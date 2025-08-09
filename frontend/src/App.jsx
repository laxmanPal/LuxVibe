import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import AdminRoute from "./components/routes/AdminRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import { AuthContextProvider } from "./store/AuthContext";
import { CategoryContectProvider } from "./store/CategoryContext";
import { ProductContextProvider } from "./store/ProductContext";
import { CartContextProvider } from "./store/CartContext";
import { WishlistContextProvider } from "./store/WishListContext";
import Checkout from "./pages/client/Checkout";
import PaymentSuccess from "./pages/client/PaymentSuccess";
import { OrderContextProvider } from "./store/OrderContext";
import Order from "./pages/client/Order";
import SingleOrder from "./pages/admin/SingleOrder";
import { AddressContextProvider } from "./store/AddressContext";

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
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "myaccount",
        element: (
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "mywishlist", element: <MyWishlist /> },
          { path: "myorders", element: <MyOrders /> },
          { path: "myorders/:orderId", element: <Order /> },
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
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "products", element: <AllProducts /> },
      { path: "create-product", element: <CreateProduct /> },
      { path: "edit-product/:productId", element: <EditProduct /> },
      { path: "categories", element: <AllCategories /> },
      { path: "users", element: <Users /> },
      { path: "orders", element: <Orders /> },
      { path: "orders/:orderId", element: <SingleOrder /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <ProductContextProvider>
          <CategoryContectProvider>
            <CartContextProvider>
              <WishlistContextProvider>
                <AddressContextProvider>
                  <OrderContextProvider>
                    <RouterProvider router={router} />
                    <ToastContainer position="top-center" autoClose={3000} />
                  </OrderContextProvider>
                </AddressContextProvider>
              </WishlistContextProvider>
            </CartContextProvider>
          </CategoryContectProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
