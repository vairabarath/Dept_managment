import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { data } from "react-router-dom";
import { z } from "zod";
import Input from "../Input";
import { Upload } from "lucide-react";

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

type FormData = z.infer<typeof schema>;

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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-xs text-gray-500 font-medium">
        Authentication information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <Input
          label="Username"
          name="username"
          register={register}
          defaultValue={data?.username}
          errors={errors?.username}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          defaultValue={data?.email}
          errors={errors?.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          defaultValue={data?.password}
          errors={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-500 font-medium">
        Personal information
      </span>

      <div className="flex justify-between flex-wrap gap-4">
        <Input
          label="First name"
          name="firstName"
          register={register}
          defaultValue={data?.firstName}
          errors={errors?.firstName}
        />
        <Input
          label="Last name"
          name="lastname"
          register={register}
          defaultValue={data?.lastName}
          errors={errors?.lastName}
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          register={register}
          defaultValue={data?.phone}
          errors={errors?.phone}
        />
        <Input
          label="Address"
          name="address"
          register={register}
          defaultValue={data?.address}
          errors={errors?.address}
        />
        <Input
          label="Birthday"
          name="birthday"
          type="date"
          register={register}
          defaultValue={data?.birthday}
          errors={errors?.birthday}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-sm font-medium">Gender</label>
          <select
            {...register("gender")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors?.gender?.message && (
            <p className="text-red-500 text-xs ">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4 ">
          <label className=" flex items-center gap-2" htmlFor="image">
            <Upload width={20} height={20} />
            <span className="text-sm text-gray-500">Upload image</span>
          </label>
          <input
            {...register("img")}
            type="file"
            name="image"
            id="image"
            className="hidden"
          />
          {errors?.img?.message && (
            <p className="text-red-500 text-xs ">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
