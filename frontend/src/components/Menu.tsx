import { Link } from "react-router-dom";
import { menuItems } from "../assets/menuItems";

const Menu = () => {
  return (
    <div className="pl-6">
      {menuItems.map((item) => (
        <div className="flex flex-col gap-2" key={item.title}>
          <span className="hidden lg:block text-gray-500 my-4 font-light ">
            {item.title}
          </span>
          {item.items.map((item) => (
            <Link
              to={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-600 py-2"
            >
              <img src={item.icon} alt="" width={20} height={20} />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
