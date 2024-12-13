import { Calendar, CalendarCheck2, Droplets, Mail, Phone } from "lucide-react";
import BigCalendar from "../components/BigCalendar";
import Announcement from "../components/Announcement";
import { Link } from "react-router-dom";
import Piechart from "../components/Piechart";

const Student = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4 ">
          <div className="bg-green py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full "
              />
            </div>
            <div className="w-2/3 flex flex-col justify-start gap-4">
              <h1 className="text-xl font-semibold">Gilli</h1>
              <p className="text-sm tetx-gray-500">
                Loram ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex mt-28 items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="flex gap-2 items-center w-full md:w-1/3 lg:w-full 2xl:w-1/3 ">
                  <Droplets width={14} height={14} />
                  <span>O+</span>
                </div>
                <div className="flex gap-2 items-center w-full md:w-1/3 lg:w-full 2xl:w-1/3 ">
                  <Calendar width={14} height={14} />
                  <span>september 2004</span>
                </div>
                <div className="flex gap-2 items-center w-full md:w-1/3 lg:w-full 2xl:w-1/3 ">
                  <Mail width={14} height={14} />
                  <span>something@gmail.com</span>
                </div>
                <div className="flex gap-2 items-center w-full md:w-1/3 lg:w-full 2xl:w-1/3 ">
                  <Phone width={14} height={14} />
                  <span>123456789</span>
                </div>
              </div>
            </div>
          </div>

          {/* small cards*/}
          <div className="flex flex-1 w-full">
            <Piechart />
          </div>
        </div>
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student's Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md ">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex gap-4 mt-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-skyBlue" to="#">
              Student's Classes
            </Link>
            <Link className="p-3 rounded-md bg-lightSkyBlue" to="#">
              Student's Teachers
            </Link>
            <Link className="p-3 rounded-md bg-lightPink" to="#">
              Student's Lessons
            </Link>
            <Link className="p-3 rounded-md bg-green" to="#">
              Student's Exams
            </Link>
            <Link className="p-3 rounded-md bg-sandle" to="#">
              Student's Assignment
            </Link>
          </div>
        </div>

        <div className="flex gap-4 flex-1 justify-between  max-h-40 flex-wrap mb-4">
          <div className="w-full bg-skyBlue max-h-40  p-4 rounded-md flex items-center justify-center gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
            <CalendarCheck2 width={24} height={24} className="w-6 h-6 " />
            <div>
              <h1 className="text-lg font-semibold">90%</h1>
              <span className="text-xs text-gray-500">Attendance</span>
            </div>
          </div>
          <div className="w-full  max-h-40 bg-green p-4 rounded-md flex items-center justify-center gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
            <CalendarCheck2 width={24} height={24} className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-semibold">80%</h1>
              <span className="text-xs text-gray-500">Marks</span>
            </div>
          </div>
        </div>

        <Announcement />
      </div>
    </div>
  );
};

export default Student;
