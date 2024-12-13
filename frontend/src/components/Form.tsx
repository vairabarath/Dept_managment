import { Divide, Edit, Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";

const Form = ({
  table,
  type,
  data,
  id,
}: {
  table: "teacher";
  type: "create" | "update" | "Delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-green"
      : type === "update"
      ? "bg-skyBlue"
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
    ) : (
      <TeacherForm type="create" />
    );
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
        <div className="w-screen h-screen absolute top-0 left-0 z-40 bg-black bg-opacity-60 flex items-center justify-center">
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
