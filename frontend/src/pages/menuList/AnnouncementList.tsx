import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { AnnouncementColumns } from "../../helper/Columns";
import { announcementsData } from "../../helper/data";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Announcements } from "../../helper/Types";
import TableSearch from "../../components/TableSearch";

const backend = import.meta.env.VITE_BACKEND_URL;

const row = (item: Announcements) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-500 h-14 text-sm hover:bg-bgDark2 transition-all duration-200 ease-in-out"
    >
      <td className="text-sm text-gray-200">{item.title}</td>
      <td className="hidden md:table-cell text-gray-200">{item.class.name}</td>
      <td className="hidden md:table-cell text-gray-200">
        {new Intl.DateTimeFormat("en-US").format(new Date(item.date))}
      </td>

      <td>
        <div className="flex items-center gap-2 my-3">
          <Form table="announcements" type="update" data={item} />
          <Form table="announcements" type="Delete" id={item.id} />
        </div>
      </td>
    </tr>
  );
};
const AnnouncementList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [Announcements, setAnnouncements] = useState<Announcements[]>([]);
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...queryParams,
      });

      const Url = `${backend}/data/all-announcements?${params.toString()}`;

      const response = await axios.get(Url);

      if (response) {
        console.log(response.data);

        setAnnouncements(response.data.announcements);
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
    <div className="flex-1 p-4 m-4 mt-0 bg-bgDark rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold text-white">
          Announcements List
        </h1>
        <div className="flex flex-col gap-4 md:flex-row items-center w-full md:w-auto">
          <TableSearch />
          <Form table="announcements" type="create" />
        </div>
      </div>

      <Table row={row} columns={AnnouncementColumns} data={Announcements} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default AnnouncementList;
