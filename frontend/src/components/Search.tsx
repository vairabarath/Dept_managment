import { assets } from "../assets/assets";

const Search = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-gray-300 px-2">
      <img src={assets.search} alt="" width={14} height={14} />
      <input
        type="text "
        placeholder="Search "
        className="w-[200px] py-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default Search;
