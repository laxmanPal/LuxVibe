import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientNavbar from "./components/clientNavbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";

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
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
