import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { ClassColumns } from "../../helper/Columns";
import { role } from "../../helper/data";
import { Classes } from "../../helper/Types";
import axios from "axios";
import { useLocation } from "react-router-dom";

const backend = import.meta.env.VITE_BACKEND_URL;

const row = (item: Classes) => {
  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-skyBlue "
    >
      <td className="text-sm ">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.semester?.level}</td>
      <td className="hidden md:table-cell">{item.incharge?.name}</td>
      {role === "admin" && (
        <td className="flex items-center gap-2">
          <Form table="class" type="update" data={item} />
          <Form table="class" type="Delete" id={item.id} />
        </td>
      )}
    </tr>
  );
};
const ClassList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [Classes, setClasses] = useState<Classes[]>([]);
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...queryParams,
      });

      const Url = `${backend}/data/all-classes?${params.toString()}`;

      const response = await axios.get(Url);

      if (response) {
        console.log(response.data);
        setClasses(response.data.classes);
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
    <div className="flex-1 bg-white m-4 p-4 mt-0 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Classes List</h2>
        <Form table="class" type="create" />
      </div>

      <Table row={row} columns={ClassColumns} data={Classes} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default ClassList;
