import { useNavigate } from "react-router-dom";
const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useNavigate();

  const prev = 10 * (page - 1) > 0;
  const next = 10 * (page - 1) + 10 < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!prev}
        onClick={() => changePage(page - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: Math.ceil(count / 10) }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${
                page === pageIndex ? "bg-skyBlue" : "bg-slate-50"
              }`}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        disabled={!next}
        onClick={() => changePage(page + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
