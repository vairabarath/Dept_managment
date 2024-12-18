import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RadialBarChartdata as data } from "../helper/RadialBarChart";
import { assets } from "../assets/assets";

const RadialBarCharts = () => {
  return (
    <div className="bg-[#1F1F1F] rounded-xl w-full h-full p-4 ">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-white">Students</h1>
        <img src={assets.moreDark} alt="" width={20} height={20} />
      </div>
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <img
          src={assets.maleFemale}
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        />
      </div>
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-2">
          <div className="w-5 h-5 bg-skyBlue rounded-full " />
          <h1 className="font-bold text-white">1,457</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lightPink rounded-full " />
          <h1 className="font-bold text-white">1,457</h1>
          <h2 className="text-xs text-gray-300">Girls (45 %)</h2>
        </div>
      </div>
    </div>
  );
};

export default RadialBarCharts;
