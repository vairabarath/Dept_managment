import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { SubjectColumns } from "../../helper/Columns";
import { role, classesData } from "../../helper/data";
import { Subjects } from "../../helper/Types";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";
import TableSearch from "../../components/TableSearch";

const backend = import.meta.env.VITE_BACKEND_URL;
const row = (item: Subjects) => {
  console.log(item);
  return (
    <tr
      key={item.id}
      className="border-b h-14 border-gray-500 text-sm hover:bg-bgDark2 transition-all duration-200 ease-in-out"
    >
      <td className="text-sm text-gray-200 ">{item.name}</td>
      <td className="hidden md:table-cell text-gray-200">
        {item.teachers.map((item) => item.name).join(", ")}
      </td>
      {role === "admin" && (
        <td className="flex items-center my-3 gap-2">
          <Form table="subject" type="update" data={item} />
          <Form table="subject" type="Delete" id={item.id} />
        </td>
      )}
    </tr>
  );
};
const SubjectList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [Subjects, setSubjects] = useState<Subjects[]>([]);
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...queryParams,
      });

      const Url = `${backend}/data/all-subjects?${params.toString()}`;

      const response = await axios.get(Url);

      if (response) {
        console.log(response.data);
        setSubjects(response.data.subjects);
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
    <div className="flex-1 bg-bgDark m-4 p-4 mt-0 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="hidden md:block text-lg font-semibold text-white">
          Subject List
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <TableSearch />
          <Form table="subject" type="create" />
        </div>
      </div>

      <Table row={row} columns={SubjectColumns} data={Subjects} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default SubjectList;
