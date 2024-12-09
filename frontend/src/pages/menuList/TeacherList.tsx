import { Delete, FilterIcon, Plus, SortDesc, Trash, View } from "lucide-react";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { TeacherColumns } from "../../helper/Columns";
import { Link } from "react-router-dom";
import { role, teachersData } from "../../helper/data";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const TeacherList = () => {
  const row = (item: Teacher) => {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-skyBlue"
      >
        <td className="flex items-center gap-4 p-4">
          <img
            src={item.photo}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:blockn w-10 h-10 object-cover rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item?.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{item.teacherId}</td>
        <td className="hidden md:table-cell">{item.subjects.join(", ")}</td>
        <td className="hidden md:table-cell">{item.classes.join(", ")}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link to={`/data/teachers/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-green">
                <View width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-skyBlue">
                <Trash width={16} height={16} />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  };
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
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green">
            <Plus width={14} height={14} />
          </button>
        </div>
      </div>

      <Table columns={TeacherColumns} row={row} data={teachersData} />

      <Pagination />
    </div>
  );
};

export default TeacherList;
