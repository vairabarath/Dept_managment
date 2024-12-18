import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { LessonColumns } from "../../helper/Columns";
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
      className="border-b h-14 border-gray-500 text-sm hover:bg-bgDark2 transition-all duration-200 ease-in-out"
    >
      <td className="text-sm text-gray-200">{item.subject?.name}</td>
      <td className="hidden md:table-cell text-gray-200">{item.class?.name}</td>
      <td className="hidden md:table-cell text-gray-200">
        {item.teacher?.name}
      </td>

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
    <div className="flex-1 p-4 m-4 mt-0 bg-bgDark rounded-md">
      <div className="flex justify-between items-center">
        <h1 className=" hidden md:block text-lg font-semibold text-white">
          Lessons List
        </h1>
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
