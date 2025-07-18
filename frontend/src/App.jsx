import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientNavbar from "./components/clientNavbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <ClientNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/men" element={<Men />} />
        </Routes>
        <Routes>
          <Route path="/women" element={<Women />} />
        </Routes>
        <Routes>
          <Route path="/kids" element={<Kids />} />
        </Routes>
        <Routes>
          <Route path="/shop" element={<Shop />} />
        </Routes>
         <Routes>
          <Route path="/categories" element={<Categories />} />
        </Routes>
         <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
