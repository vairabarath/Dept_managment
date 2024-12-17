import { FieldError } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  register: any;
  errors?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const Input = ({
  label,
  name,
  defaultValue,
  type = "text",
  register,
  errors,
  inputProps,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        defaultValue={defaultValue}
        {...inputProps}
      />
      {errors?.message && (
        <p className="text-red-500 text-xs ">{errors.message.toString()}</p>
      )}
    </div>
  );
};

export default Input;
