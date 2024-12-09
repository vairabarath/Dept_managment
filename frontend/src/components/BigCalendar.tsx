"use client";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "../helper/data";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["day"]}
      view={Views.DAY}
      style={{ height: "98%" }}
      min={new Date(2025, 1, 0, 9, 30, 0)}
      max={new Date(2025, 1, 0, 15, 45, 0)}
      step={27.5}
      timeslots={2}
    />
  );
};

export default BigCalendar;
