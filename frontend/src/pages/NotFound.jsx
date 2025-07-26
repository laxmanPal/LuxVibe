import { Link } from "react-router-dom";
import errorImage from "../assets/error.jpg";
import logo from "../assets/logo-4.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  text-[#222]">
      {/* Left */}
      <div className="w-full md:w-1/2 h-96 md:h-screen">
        <img
          src={errorImage}
          alt="Lost World"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 h-96 md:h-screen flex flex-col items-center justify-between py-10 px-8 relative text-center">
        {/* Logo Top */}
        <div className="">
          <img src={logo} alt="" />
        </div>

        {/* Center Content */}
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Opps! You have found <br /> the lost world!
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            Home is just a click away. Let’s go back and <br />
            continue our regular life
          </p>
          <Link
            to="/"
            className="inline-block font-semibold text-sm  rounded hover:underline transition"
          >
            GO TO HOME
          </Link>
        </div>

        {/* Footer Code */}
        <div className="text-xs text-gray-500 absolute bottom-4">
          404 Page Not Found
        </div>
      </div>
    </div>
  );
};

export default NotFound;
