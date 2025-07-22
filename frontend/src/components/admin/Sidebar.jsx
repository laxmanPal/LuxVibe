import logo from "../../assets/logo-4.png";
import logo2 from "../../assets/logo-2.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`transition-all duration-300 bg-white  flex flex-col border-r border-gray-300 py-2 px-4 ${
        isOpen ? "w-[18%]" : "w-[5%]"
      }`}
    >
      <div className=" py-2 w-full">
        <Link className="flex items-center justify-between" to={"/"}>
          {isOpen ? (
            <img className="" src={logo} alt="" />
          ) : (
            <img className="w-20" src={logo2} alt="" />
          )}
        </Link>
      </div>
      <ul className="mt-4">
        <li className="">
          <Link to={"dashboard"}>
            <Button className="w-full !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !capitalize !py-3 hover:!bg-gray-100">
              <RxDashboard className="text-[18px]" /> {isOpen && "Dashboard"}
            </Button>
          </Link>
        </li>
        <li className="">
          <Button className="w-full !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !capitalize !py-3 hover:!bg-gray-100">
            <FiUsers className="text-[18px]" /> {isOpen && "Users"}
          </Button>
        </li>
        <li className="">
          <Link to={"all-products"}>
            <Button className="w-full !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !capitalize !py-3 hover:!bg-gray-100">
              <BsBoxSeam className="text-[18px]" /> {isOpen && "Products"}
            </Button>
          </Link>
        </li>
        <li className="">
          <Button className="w-full !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !capitalize !py-3 hover:!bg-gray-100">
            <MdOutlineCategory className="text-[20px]" />{" "}
            {isOpen && "Categories"}
          </Button>
        </li>
        <li className="">
          <Button className="w-full !justify-start flex gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !capitalize !py-3 hover:!bg-gray-100">
            <IoBagCheckOutline className="text-[20px]" /> {isOpen && "Orders"}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
