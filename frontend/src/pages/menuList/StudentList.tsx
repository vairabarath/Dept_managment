import { Filter, SortDesc, View, CalendarCheck2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { role, studentsData } from "../../helper/data";
import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { StudentColumns } from "../../helper/Columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import TableSearch from "../../components/TableSearch";
import { Student } from "../../helper/Types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const row = (item: Student) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-skyBlue"
    >
      <td className="flex items-center gap-4 p-4">
        <img
          src={item.img || assets.noProfile}
          alt="student photo"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 object-cover rounded-full"
        />
        <div className="flex flex-col ">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.class?.name || "N/A"}</td>
      <td className="hidden md:table-cell">{item.semester?.level || "N/A"}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2 ">
          <Link to={`/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-green">
              <View width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <Form table="student" type="Delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};
const StudentList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [count, setCount] = useState(0);
  const [Students, setStudents] = useState<Student[]>([]);

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        ...queryParams,
        page: page.toString(),
      });

      const Url = `${backendUrl}/data/all-students?${params.toString()}`;
      const response = await axios.get(Url);
      if (response) {
        console.log(response.data);
        setStudents(response.data.students);
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
    const { page, ...queryParams } = Object.fromEntries(searchParams);
    if (page) {
      setPage(parseInt(page));
    }
    if (queryParams) {
      setQueryParams(queryParams);
    }
  }, [location]);

  return (
    <div className="flex-1 bg-white p-4 m-4 mt-0 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">Students</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green">
              <Filter width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green">
              <SortDesc width={14} height={14} />
            </button>
            {role === "admin" && <Form table="student" type="create" />}
          </div>
        </div>
      </div>

      <Table columns={StudentColumns} row={row} data={Students} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default StudentList;
