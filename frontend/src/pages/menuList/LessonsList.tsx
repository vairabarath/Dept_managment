import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { LessonColumns } from "../../helper/Columns";
import { data } from "../../helper/AttendanceChartData";
import { lessonsData } from "../../helper/data";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Lessons } from "../../helper/Types";
import TableSearch from "../../components/TableSearch";

const backend = import.meta.env.VITE_BACKEND_URL;

const row = (item: Lessons) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-skyBlue"
    >
      <td className="text-sm">{item.subject?.name}</td>
      <td className="hidden md:table-cell">{item.class?.name}</td>
      <td className="hidden md:table-cell">{item.teacher?.name}</td>

      <td>
        <div className="flex items-center gap-2">
          <Form table="lesson" type="update" data={item} />
          <Form table="lesson" type="Delete" id={item.id} />
        </div>
      </td>
    </tr>
  );
};
const LessonsList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [Lessons, setLessons] = useState<[]>([]);
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...queryParams,
      });

      const Url = `${backend}/data//all-lessons?${params.toString()}`;

      const response = await axios.get(Url);

      if (response) {
        console.log(response.data);
        setLessons(response.data.lessons);
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
        <h1 className=" hidden md:block text-lg font-semibold">Lessons List</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <Form table="lesson" type="create" />
        </div>
      </div>

      <Table row={row} columns={LessonColumns} data={Lessons} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default LessonsList;
