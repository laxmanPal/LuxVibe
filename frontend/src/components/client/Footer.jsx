import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoArrowForward } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="pt-8">
      <div className="container">
        <div className=" mx-auto px-4  flex items-center justify-between">
          <div className="w-[30%] py-5 px-5 pl-0 border-r-1 border-gray-300">
            <img className="w-2xs" src={logo} alt="" />
            <p className="mt-4 text-gray-600 text-sm ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* <!-- Newsletter --> */}
          <div className="w-[40%] py-5 px-5 border-r-1 border-gray-300">
            <h3 className="font-semibold text-xl mb-4">Subscribe Newsletter</h3>
            <p className="text-gray-600 text-sm mb-6">
              We invite you to register to read the latest news, offers and
              events about our company. We promise not spam your inbox.
            </p>
            <div className="flex items-center rounded-full border border-gray-200 overflow-hidden w-full max-w-md hover:border-black">
              <input
                type="email"
                placeholder="Enter your e-mail..."
                className="flex-grow px-4 py-2 outline-none bg-transparent"
              />
              <button className="bg-black text-white p-3">
                <IoArrowForward />
              </button>
            </div>
          </div>

          {/* <!-- About Us --> */}
          <div className="w-[30%] flex justify-between py-5 px-5 pr-0 gap-4">
            <div className="w-[50%]">
              <h3 className="font-semibold text-lg mb-4">Quicklinks</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Kids
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-[50%]">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    BAGS
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    CLOTHES
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    FOOTWEAR
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    JEWELRY
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    SUNGLASSES
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <!-- Bottom Bar --> */}
        <div className="border-t border-gray-300 mt-6">
          <div className=" mx-auto px-4 py-6 flex  justify-center items-center gap-4">
            <p className="text-sm ">
              Copyright © {new Date().getFullYear()} by{" "}
              <strong>
                <Link className="link" to={"https://laxmanpal.netlify.app/"}>
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
