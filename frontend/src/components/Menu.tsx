import { Link } from "react-router-dom";
import { menuItems } from "../helper/menuItems";
import { role } from "../helper/data";

const Menu = () => {
  return (
    <div className="pl-6">
      {menuItems.map((i: any) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-white my-4 font-light ">
            {i.title}
          </span>
          {i.items.map((item: any) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  to={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-200 py-2 md:px-4 rounded-md hover:bg-[#121212] hover:scale-105 transition-transform duration-300 ease-in-out transform-origin-center"
                >
                  <img src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
