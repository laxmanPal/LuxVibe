import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoArrowForward } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-gray-800 border-t border-gray-200">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Logo & Description */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <img className="w-36" src={logo} alt="Logo" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-200 hover:bg-blue-600 hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <FaFacebookF className="text-sm text-gray-700 hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-200 hover:bg-pink-600 hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <FaInstagram className="text-sm text-gray-700 hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-200 hover:bg-blue-400 hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <FaTwitter className="text-sm text-gray-700 hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-200 hover:bg-blue-700 hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                  <FaLinkedinIn className="text-sm text-gray-700 hover:text-white" />
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Subscribe Newsletter</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Stay updated with our latest products, exclusive offers, and fashion trends. 
                  Join thousands of satisfied customers who never miss out on our amazing deals.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="relative group">
                  <div className="flex rounded-2xl bg-white border-2 border-gray-200 overflow-hidden group-hover:border-gray-300 group-focus-within:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md">
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      className="flex-grow px-5 py-4 bg-transparent text-gray-800 placeholder-gray-500 outline-none text-sm"
                    />
                    <button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-6 py-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg">
                      <IoArrowForward className="text-lg" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-8">
              {/* Quicklinks */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Links</h3>
                <ul className="space-y-3">
                  {["Home", "Men", "Women", "Kids"].map((item) => (
                    <li key={item}>
                      <Link
                        to={"/"}
                        className="text-gray-600 hover:text-black text-sm transition-colors duration-200 hover:translate-x-1 transform inline-block font-medium"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-gray-900">Categories</h3>
                <ul className="space-y-3">
                  {["BAGS", "CLOTHES", "FOOTWEAR", "JEWELRY", "SUNGLASSES"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          to={"/"}
                          className="text-gray-600 hover:text-black text-sm transition-all duration-200 hover:translate-x-1 transform inline-block font-medium"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 bg-gray-100">
          <div className="px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600 text-center sm:text-left">
                Copyright © {new Date().getFullYear()} by{" "}
                <Link 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200" 
                  to="https://laxmanpal.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Laxman Pal
                </Link>
                . All Rights Reserved.
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <Link to="/privacy" className="hover:text-gray-900 transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-gray-900 transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link to="/contact" className="hover:text-gray-900 transition-colors duration-200">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
