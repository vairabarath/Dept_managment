import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { data } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters" })
    .max(20, { message: "username must be at most 20 characters" }),
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
  firstName: z.string().min(2, { message: "first name is required" }),
  lastName: z.string().min(2, { message: "last name is required" }),
  phone: z.string().min(2, { message: "phone number is required" }),
  address: z.string().min(2, { message: "address is required" }),
  birthday: z.date({ message: "birthday is required" }),
  gender: z.enum(["male", "female"], {
    message: "gender is required",
  }),
  img: z.instanceof(File, { message: "image is required" }),
});

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-xs text-gray-500 font-medium">
        Authentication information
      </span>
      <input
        type="text"
        {...register("username")}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
      />
      {errors.username?.message && (
        <p className="text-red-500 text-xs ">
          {errors.username?.message.toString()}
        </p>
      )}
      <span className="text-xs text-gray-500 font-medium">
        Personal information
      </span>
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
