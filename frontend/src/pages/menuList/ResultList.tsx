import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { ResultColumns } from "../../helper/Columns";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Results } from "../../helper/Types";
import TableSearch from "../../components/TableSearch";

const backend = import.meta.env.VITE_BACKEND_URL;

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  teacherName: string;
  score: number;
  className: string;
  type: string;
  startTime: string;
};

const row = (item: ResultList) => {
  return (
    <tr
      key={item?.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-skyBlue"
    >
      <td className="text-sm">{item?.title}</td>
      <td className="hidden md:table-cell">{item?.className}</td>
      <td className="hidden md:table-cell">{item?.teacherName}</td>
      <td className="hidden md:table-cell">{item?.studentName}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(new Date(item.startTime))}
      </td>
      <td className="hidden md:table-cell">{item?.type}</td>
      <td className="hidden md:table-cell">{item?.score}</td>

      <td>
        <div className="flex items-center gap-2">
          <Form table="result" type="update" data={item} />
          <Form table="result" type="Delete" id={item.id} />
        </div>
      </td>
    </tr>
  );
};
const ResultList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<{ classId?: string }>({});
  const [Results, setResults] = useState<Results[]>([]);
  const [count, setCount] = useState(0);
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...queryParams,
      });

      const Url = `${backend}/data/all-results?${params.toString()}`;

      const response = await axios.get(Url);

      if (response) {
        console.log(response.data.results);
        setResults(response.data.results);
        setCount(response.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(Results);

  const data = Results.map((item) => {
    const assessment = item.exam || item.assignment;

    if (assessment) {
      const isAssignment = "startDate" in assessment;

      return {
        id: item.id,
        title: assessment.title,
        studentName: item.Student.name,
        teacherName: assessment.lesson.teacher.name,
        score: item.score,
        className: assessment.lesson.class.name,
        type: isAssignment ? "Assignment" : "Exam",
        startTime: isAssignment ? assessment.startDate : assessment.startTime,
      };
    }
  });

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
        <h1 className="hidden md:block text-lg font-semibold">Results List</h1>
        <div className="flex flex-col gap-4 item-center md:flex-row w-full md:w-auto">
          <TableSearch />
          <Form table="result" type="create" />
        </div>
      </div>

      <Table row={row} columns={ResultColumns} data={data} />

      <Pagination page={page} count={count} />
    </div>
  );
};

export default ResultList;
