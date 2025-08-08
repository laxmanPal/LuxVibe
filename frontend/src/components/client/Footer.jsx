import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoArrowForward } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="pt-8">
      <div className="container">
        {/* Top Section */}
        <div className="mx-auto px-4 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Logo & Description */}
          <div className="md:w-1/3 py-5 px-0 md:px-5 md:pl-0 md:border-r border-gray-300">
            <img className="w-32" src={logo} alt="Logo" />
            <p className="mt-4 text-gray-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Newsletter */}
          <div className="md:w-2/5 py-5 px-0 md:px-5 md:border-r border-gray-300">
            <h3 className="font-semibold text-xl mb-4">Subscribe Newsletter</h3>
            <p className="text-gray-600 text-sm mb-6">
              We invite you to register to read the latest news, offers and
              events about our company. We promise not to spam your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-full border border-gray-200 overflow-hidden w-full max-w-md hover:border-black">
              <input
                type="email"
                placeholder="Enter your e-mail..."
                className="flex-grow px-4 py-2 outline-none bg-transparent"
              />
              <button className="bg-black text-white p-3 flex items-center justify-center">
                <IoArrowForward />
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="md:w-1/3 flex flex-col sm:flex-row justify-between py-5 px-0 md:px-5 md:pr-0 gap-6 sm:gap-4">
            {/* Quicklinks */}
            <div className="sm:w-1/2">
              <h3 className="font-semibold text-lg mb-4">Quicklinks</h3>
              <ul className="space-y-2 text-gray-700">
                {["Home", "Men", "Women", "Kids"].map((item) => (
                  <li key={item}>
                    <Link
                      to={"/"}
                      className="link transition text-sm font-medium"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="sm:w-1/2">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-700">
                {["BAGS", "CLOTHES", "FOOTWEAR", "JEWELRY", "SUNGLASSES"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to={"/"}
                        className="link transition text-sm font-medium"
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-6">
          <div className="mx-auto px-4 py-6 flex flex-col sm:flex-row justify-center items-center gap-2 text-center">
            <p className="text-sm">
              Copyright © {new Date().getFullYear()} by{" "}
              <strong>
                <Link className="link" to="https://laxmanpal.netlify.app/">
                  Laxman Pal
                </Link>
              </strong>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
