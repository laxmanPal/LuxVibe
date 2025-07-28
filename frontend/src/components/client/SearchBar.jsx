import { IoSearch } from "react-icons/io5";
import { Button } from '@mui/material'

const SearchBar = () => {
  return (
     <div className="header py-4  border-b-[1px] border-gray-300">
          <div className="container flex items-center justify-center">
            <div className="searchBox transition w-[50%] h-[50px] border border-gray-300 rounded-full relative p-2 hover:border-black">
              <input
                type="text"
                name=""
                id=""
                placeholder="Search for products...."
                className="w-full h-[35-px] focus:outline-none bg-inherit p-2 text-[15px]"
              />
              <Button className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black">
                <IoSearch className="text-2xl text-[#4e4e4e]" />
              </Button>
            </div>
          </div>
        </div>
  )
}

export default SearchBar
