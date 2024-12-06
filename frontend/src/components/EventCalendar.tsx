import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { assets } from "../assets/assets";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Event 1",
    time: "10:00 AM - 11:00 AM",
    description: "Description for Event 1",
  },
  {
    id: 2,
    title: "Event 2",
    time: "10:00 AM - 11:00 AM",
    description: "Description for Event 2",
  },
  {
    id: 3,
    title: "Event 3",
    time: "10:00 AM - 11:00 AM",
    description: "Description for Event 3",
  },
];
const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white rounded-md  p-4 ">
      <Calendar onChange={onChange} value={value} />
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Events</h1>
        <img src={assets.moreDark} alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4 ">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-200 border-t-4 odd:border-t-skyBlue even:border-t-yellow "
            key={event.id}
          >
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-xs text-gray-400">{event.time}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalender;
