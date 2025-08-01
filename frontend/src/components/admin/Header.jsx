import { IconButton } from "@mui/material";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Badge from "@mui/material/Badge";
import { FaBell } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../../store/AuthContext";
import userDefaultImage from "../../assets/user.jpg";
const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [openMyAccMenu, setopenMyAccMenu] = useState(null);
  const openMenu = Boolean(openMyAccMenu);
  const handleOpenMyAccMenu = (event) => {
    setopenMyAccMenu(event.currentTarget);
  };
  const handleCloseMyAccMenu = () => {
    setopenMyAccMenu(null);
  };
  return (
    <div className="py-4 px-7  flex items-center justify-between bg-white border-b border-gray-300">
      {/* <!-- Left icons (Menu, Search) --> */}
      <div className="flex items-center space-x-4">
        {/* <!-- Menu icon --> */}
        <IconButton onClick={toggleSidebar}>
          <HiOutlineMenuAlt2 className="link text-[25px] text-black" />
        </IconButton>
        {/* <!-- Search icon --> */}
        {/* <button>
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2"
           viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button> */}
      </div>

      {/* <!-- Right icons (Flag, Bell, Settings, Avatar) --> */}
      <div className="flex items-center gap-4">
        {/* <!-- Notification Bell --> */}
        <IconButton>
          <Badge color="secondary" variant="dot">
            <FaBell className=" text-[25px] text-black" />
          </Badge>
        </IconButton>

        {/* <!-- Profile Avatar --> */}
        <div>
          <IconButton onClick={handleOpenMyAccMenu}>
            <img
              src={user.avatar.url || userDefaultImage}
              alt="user avatar"
              className="w-10 h-10 rounded-full  object-cover"
            />
          </IconButton>
          <Menu
            anchorEl={openMyAccMenu}
            id="account-menu"
            open={openMenu}
            onClose={handleCloseMyAccMenu}
            onClick={handleCloseMyAccMenu}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleCloseMyAccMenu}>
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar.url || userDefaultImage}
                  alt="user avatar"
                  className="w-10 h-10 rounded-full  object-cover"
                />
                <div className="info">
                  <h3 className="text-[15px] font-[500] leading-5">
                    {user.name}
                  </h3>
                  <p className="text-[13px] opacity-70 font-[400]">
                    {user.email}
                  </p>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMyAccMenu}>
              <div className="flex items-center gap-3">
                <RxAvatar className="text-[20px] text-black" />
                <span className="text-[15px]">Profile</span>
              </div>
            </MenuItem>
            <MenuItem onClick={logout}>
              <div className="flex items-center gap-3">
                <TbLogout className="text-[20px] text-black" />
                <span className="text-[15px]">Logout</span>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
