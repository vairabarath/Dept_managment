import { assets } from "../assets/assets";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { data } from "../helper/AttendanceChartData";

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg  h-full p-4  ">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <img src={assets.moreDark} alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "white", borderRadius: "10px" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar dataKey="present" fill="#C3EBFA" legendType="circle" />
          <Bar dataKey="absent" fill="#CBF7B8" legendType="circle" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
