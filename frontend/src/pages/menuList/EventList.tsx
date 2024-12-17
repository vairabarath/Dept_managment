import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Form from "../../components/Form";
import { eventsData } from "../../helper/data";
import { EventColumns } from "../../helper/Columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Events } from "../../helper/Types";
import TableSearch from "../../components/TableSearch";

const backend = import.meta.env.VITE_BACKEND_URL;

const row = (item: Events) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-skyBlue"
    >
      <td className="text-sm">{item.title}</td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(new Date(item.startTime))}
      </td>
      <td className="hidden md:table-cell">
        {item.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>
      <td className="hidden md:table-cell">
        {item.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>

      <td>
        <div className="flex items-center gap-2">
          <Form table="events" type="update" data={item} />
          <Form table="events" type="Delete" id={item.id} />
        </div>
      </td>
    </tr>
  );
};
const EventList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [Events, setEvents] = useState<Events[]>([]);
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...queryParams,
      });

      const Url = `${backend}/data/all-events?${params.toString()}`;

      const response = await axios.get(Url);

      if (response) {
        console.log(response.data);
        const events = response.data.events.map((event: any) => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
        }));
        setEvents(events);
        setCount(response.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, queryParams]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const { page, ...queryParams } = Object.fromEntries(searchParams.entries());
    if (page) {
      setPage(parseInt(page));
    }
    if (queryParams) {
      setQueryParams(queryParams);
    }
  }, [location]);
  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">Events List</h1>
        <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
          <TableSearch />
          <Form table="events" type="create" />
        </div>
      </div>

      <Table row={row} columns={EventColumns} data={Events} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default EventList;
