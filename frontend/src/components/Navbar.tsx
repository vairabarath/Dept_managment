import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="hidden md:flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-gray-300 px-2">
        <img src={assets.search} alt="" width={14} height={14} />
        <input
          type="text "
          placeholder="Search "
          className="w-[200px] py-2 bg-transparent outline-none"
        />
      </div>

      {/* ................... */}
      <div className="flex items-center gap-6 w-full justify-end">
        <div className="bg-white cursor-pointer rounded-full w-7 h-7 flex items-center justify-center">
          <img src={assets.message} alt="" width={20} height={20} />
        </div>
        <div className=" relative bg-white cursor-pointer rounded-full w-7 h-7 flex items-center justify-center">
          <img src={assets.assouncement} alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center text-white text-xs rounded-full bg-blue-600 ">
            2
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Barath</span>
          <span className="text-[10px] text-gray-400 text-right">Admin</span>
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
