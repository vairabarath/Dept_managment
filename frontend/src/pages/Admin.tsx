import Announcement from "../components/Announcement";
import AttendanceChart from "../components/AttendanceChart";
import Cards from "../components/Cards";
import EventCalender from "../components/EventCalendar";
import RadialBarChart from "../components/RadialBarCharts";
const Admin = () => {
  return (
    <div className="p-2 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* radial bar chart */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <RadialBarChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <Cards types="Student" />
          <Cards types="Teachers" />
          <Cards types="Teachers" />
          <Cards types="Teachers" />
        </div>
        {/* announcement */}
        <div>
          <Announcement />
        </div>
      </div>

      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 ">
        <EventCalender />
      </div>
    </div>
  );
};

export default Admin;
