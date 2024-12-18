import { Edit, Plus, Trash, X } from "lucide-react";
import { useState } from "react";

import TeacherForm from "./forms/TeacherForm";

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
};

const Form = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "events"
    | "announcements";
  type: "create" | "update" | "Delete";
  data?: any;
  id?: number | string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-darkGreen"
      : type === "update"
      ? "bg-violet"
      : "bg-skyBlue";

  const [open, setOpen] = useState(false);

  const handleForm = () => {
    return type === "Delete" && id ? (
      <form className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be deleted. Are you sure?
        </span>
        <button className="bg-red-600 text-white px-4 py-2 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : null;
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {type === "create" ? (
          <Plus width={16} height={16} />
        ) : type === "update" ? (
          <Edit width={16} height={16} />
        ) : (
          <Trash width={16} height={16} />
        )}
      </button>

      {open && (
        <div className="fixed  inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            {handleForm()}
            <div
              className="absolute top-4 right-4 cursor-pointer "
              onClick={() => setOpen(false)}
            >
              <X width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
