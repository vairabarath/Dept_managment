import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { assets } from "../assets/assets";

const data = [
  { name: "Group A", value: 80, fill: "#BB86FC" },
  { name: "Group B", value: 20, fill: "#03DAC6" },
];

const Piechart = () => {
  const greaterValue = data[0].value > data[1].value ? data[0] : data[1];
  const textColor = greaterValue.fill;

  return (
    <div className="bg-bgDark rounded-md h-80 p-4 w-full relative">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-semibold text-white">Performance</h1>
        <img src={assets.moreDark} alt="" width={16} height={16} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl font-bold" style={{ color: textColor }}>
          9.2
        </h1>
        <p className="text-sm text-purple-300">good</p>
      </div>
      <h2 className="absolute bottom-16 left-0 right-0 m-auto text-center font-medium text-white">
        Current Semester
      </h2>
    </div>
  );
};

export default Piechart;
