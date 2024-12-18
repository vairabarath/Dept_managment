import { Megaphone, MessageCircleDashed, Search } from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="hidden md:flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Search width={16} height={16} className="text-white" />
        <input
          type="text "
          placeholder="Search "
          className="w-[200px] py-2 bg-transparent outline-none text-white"
        />
      </div>

      {/* ................... */}
      <div className="flex items-center gap-6 w-full justify-end">
        <div className="bg-[#606368] cursor-pointer rounded-full w-7 h-7 flex items-center justify-center">
          <MessageCircleDashed width={20} height={20} className="text-white" />
        </div>
        <div className=" relative bg-[#606368] cursor-pointer rounded-full w-7 h-7 flex items-center justify-center">
          <Megaphone width={20} height={20} className="text-white" />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center text-white text-xs rounded-full bg-blue-600 ">
            2
          </div>
        </div>

        <div className="flex flex-col ">
          <span className="text-xs leading-3 font-medium text-white">
            Barath
          </span>
          <span className="text-[10px] text-gray-200 text-right ">Admin</span>
        </div>
        <div>
          <img
            src={assets.avatar}
            width={36}
            height={36}
            className="rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
