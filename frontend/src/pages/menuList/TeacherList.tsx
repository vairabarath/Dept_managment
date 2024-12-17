import { FilterIcon, SortDesc, View } from "lucide-react";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { TeacherColumns } from "../../helper/Columns";
import { Link, useLocation } from "react-router-dom";
import { role } from "../../helper/data";
import Form from "../../components/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { Teacher } from "../../helper/Types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const row = (item: Teacher) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-skyBlue"
    >
      <td className="flex items-center gap-4 p-4">
        <img
          src={item.img || assets.noProfile}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 object-cover rounded-full"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((subject) => subject.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((classItem) => classItem.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link to={`/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-green">
              <View width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-skyBlue">
            //   <Trash width={16} height={16} />
            // </button>
            <Form type="Delete" table="teacher" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};

const TeacherList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [count, setCount] = useState(0);
  const [Teachers, setTeachers] = useState<Teacher[]>([]);

  console.log(queryParams.classId);
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        ...queryParams,
        page: page.toString(),
      });

      const Url = `${backendUrl}/data/all-teachers?${params.toString()}`;
      const response = await axios.get(Url);
      if (response) {
        setTeachers(response.data.teachers);
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
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between ">
        <h1 className="text-lg font-semibold ">Teachers</h1>

        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green">
            <FilterIcon width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green">
            <SortDesc width={14} height={14} />
          </button>
          {role === "admin" && <Form type="create" table="teacher" />}
        </div>
      </div>

      <Table columns={TeacherColumns} row={row} data={Teachers} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default TeacherList;
