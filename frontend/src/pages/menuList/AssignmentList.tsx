import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { AssignmentColumns } from "../../helper/Columns";
import { assignmentsData } from "../../helper/data";
import { Assignments } from "../../helper/Types";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TableSearch from "../../components/TableSearch";

const backend = import.meta.env.VITE_BACKEND_URL;

const row = (item: Assignments) => {
  return (
    <tr
      key={item.id}
      className="border-b h-14 border-gray-500  text-sm hover:bg-bgDark2 transition-all duration-200 ease-in-out"
    >
      <td className="text-sm text-gray-200">{item.lesson?.subject.name}</td>
      <td className="hidden md:table-cell text-gray-200">
        {item.lesson?.class.name}
      </td>
      <td className="hidden md:table-cell text-gray-200">
        {item.lesson?.teacher.name}
      </td>
      <td className="hidden md:table-cell text-gray-200">
        {new Intl.DateTimeFormat("en-US").format(new Date(item.dueDate))}
      </td>

      <td>
        <div className="flex items-center gap-2 my-3">
          <Form table="assignment" type="update" data={item} />
          <Form table="assignment" type="Delete" id={item.id} />
        </div>
      </td>
    </tr>
  );
};
const AssignmentList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [Assignments, setAssignments] = useState<Assignments[]>([]);
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...queryParams,
      });

      const Url = `${backend}/data/all-assignments?${params.toString()}`;

      const response = await axios.get(Url);

      if (response) {
        console.log(response.data);
        setAssignments(response.data.assignments);
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
          Assignments List
        </h1>
        <div className="flex flex-col md:flex-row gap-4 w-full items-center md:w-auto">
          <TableSearch />
          <Form table="lesson" type="create" />
        </div>
      </div>

      <Table row={row} columns={AssignmentColumns} data={Assignments} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default AssignmentList;
