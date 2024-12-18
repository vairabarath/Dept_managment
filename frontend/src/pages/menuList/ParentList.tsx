import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { ParentColumns } from "../../helper/Columns";
import { role } from "../../helper/data";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TableSearch from "../../components/TableSearch";
import { Parent } from "../../helper/Types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const row = (items: Parent) => {
  return (
    <tr className="border-b border-gray-500 text-sm hover:bg-bgDark2 hover:scale-105 transition-transform duration-300 ease-in-out transform-origin-center">
      <td className="p-4 flex flex-col">
        <h3 className="font-semibold text-gray-200">{items.name}</h3>
        <p className="text-xs text-gray-400">{items.email}</p>
      </td>

      <td className="hidden md:table-cell text-gray-200">
        {items.students?.map((item) => item.name).join(", ")}
      </td>
      <td className="hidden md:table-cell text-gray-200">{items.phone}</td>
      <td className="hidden md:table-cell text-gray-200">{items.address}</td>
      {role === "admin" && (
        <td>
          <div className="flex items-center gap-2">
            <Form table="parent" type="update" data={items} />
            <Form table="parent" type="Delete" id={items.id} />
          </div>
        </td>
      )}
    </tr>
  );
};
const ParentList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [count, setCount] = useState(0);
  const [Parents, setParents] = useState<Parent[]>([]);

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        ...queryParams,
        page: page.toString(),
      });

      const Url = `${backendUrl}/data/all-parents?${params.toString()}`;
      const response = await axios.get(Url);
      if (response) {
        console.log(response.data);
        setParents(response.data.parents);
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
    <div className="flex-1 p-4 m-4 mt-0 bg-bgDark rounded-md">
      <div className="flex justify-between items-center">
        <h2 className=" hidden md:block text-lg font-semibold text-white">
          Parent List
        </h2>
        <div className="flex flex-cols md:flex-row gap-4 w-full md:w-auto">
          <TableSearch />
          <Form table="parent" type="create" />
        </div>
      </div>

      <Table row={row} columns={ParentColumns} data={Parents} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default ParentList;
