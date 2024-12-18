import { assets } from "../assets/assets";

const Cards = ({ types }: { types: string }) => {
  return (
    <div className="rounded-2xl odd:bg-violet flex-1 p-4 even:bg-darkGreen min-w-[130px]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600 ">
          2024/25
        </span>
        <img src={assets.more} alt="" width={20} height={20} />
      </div>
      <h1>150</h1>
      <h2 className=" font-medium text-gray-700">{types}</h2>
    </div>
  );
};

export default Cards;
