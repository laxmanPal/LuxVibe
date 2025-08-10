import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/client/Home"));
const Shop = lazy(() => import("./pages/client/Shop"));
const Categories = lazy(() => import("./pages/client/Categories"));
const ProductDetails = lazy(() => import("./pages/client/ProductDetails"));
const Login = lazy(() => import("./pages/auth/Login"));
const ClientLayout = lazy(() => import("./layouts/ClientLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const Register = lazy(() => import("./pages/auth/Register"));
const Cart = lazy(() => import("./pages/client/Cart"));
const Dashboard = lazy(() => import("./pages/client/Dashboard"));
const MyAccount = lazy(() => import("./components/client/MyAccount"));
const MyWishlist = lazy(() => import("./pages/client/MyWishlist"));
const MyOrders = lazy(() => import("./pages/client/MyOrders"));
const MyAddresses = lazy(() => import("./pages/client/MyAddresses"));
const AccountDetails = lazy(() => import("./pages/client/AccountDetails"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AllProducts = lazy(() => import("./pages/admin/AllProducts"));
const CreateProduct = lazy(() => import("./pages/admin/CreateProduct"));
const EditProduct = lazy(() => import("./pages/admin/EditProduct"));
const AllCategories = lazy(() => import("./pages/admin/AllCategories"));
const Users = lazy(() => import("./pages/admin/Users"));
const Orders = lazy(() => import("./pages/admin/Orders"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Category = lazy(() => import("./pages/client/Category"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const PrivateRoute = lazy(() => import("./components/routes/PrivateRoute"));
const Checkout = lazy(() => import("./pages/client/Checkout"));
const PaymentSuccess = lazy(() => import("./pages/client/PaymentSuccess"));
const Order = lazy(() => import("./pages/client/Order"));
const SingleOrder = lazy(() => import("./pages/admin/SingleOrder"));

import { AuthContextProvider } from "./store/AuthContext";
import { CategoryContectProvider } from "./store/CategoryContext";
import { ProductContextProvider } from "./store/ProductContext";
import { CartContextProvider } from "./store/CartContext";
import { WishlistContextProvider } from "./store/WishListContext";
import { OrderContextProvider } from "./store/OrderContext";
import { AddressContextProvider } from "./store/AddressContext";
import { PageLoader } from "./components/UI/PageLoader";

// Router
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
    <AuthContextProvider>
      <ProductContextProvider>
        <CategoryContectProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <AddressContextProvider>
                <OrderContextProvider>
                  {/* <Suspense fallback={<PageLoader />}> */}
                    <RouterProvider router={router} />
                  {/* </Suspense> */}
                  <ToastContainer position="top-center" autoClose={1000} />
                </OrderContextProvider>
              </AddressContextProvider>
            </WishlistContextProvider>
          </CartContextProvider>
        </CategoryContectProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
