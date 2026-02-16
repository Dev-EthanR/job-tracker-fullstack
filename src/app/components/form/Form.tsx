"use client";
import type FormFields from "@/src/entities/FormFields";
import { Application } from "@/src/generated/prisma/client";
import useTheme from "@/src/hooks/useTheme";
import { schema, type FormDataShape } from "@/src/utilities/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ModalContainer from "../ModalContainer";
import FormButton from "./FormButton";
import FormHeader from "./FormHeader";
import type { FormType } from "./FormInput";
import Input from "./FormInput";
import LabelOptions from "./FormOptions";
import { BeatLoader } from "react-spinners";
import { useEffect } from "react";
interface Props {
  id: FormType;
  open: boolean;
  title: string;
  submitLabel: string;
  defaultValues?: Application;
  onClose: () => void;
  onSubmit: (data: FormDataShape) => void;
  loading: boolean;
}

const Form = ({
  id,
  open,
  title,
  submitLabel,
  defaultValues,
  onClose,
  onSubmit,
  loading,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm<FormDataShape>({
    resolver: zodResolver(schema),
  });

  const { theme } = useTheme();
  function exit(): void {
    clearErrors();
    reset();
    onClose();
  }

  const defaultLabel: string | null = localStorage.getItem("defaultLabel");

  const fields: FormFields[] = [
    { name: "Company", key: "company", type: "text", error: errors.company },
    { name: "Position", key: "position", type: "text", error: errors.position },
  ];
  return (
    <ModalContainer open={open} onClose={() => exit()}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`absolute left-1/2 top-1/2 z-200 -translate-x-1/2 -translate-y-1/2 flex flex-col  p-5 rounded-lg shadow-2xl w-80 md:w-140 ${theme === "dark" ? "bg-dark-primary" : "bg-primary"} overflow-hidden`}
        role="dialog"
        aria-expanded={open}
        aria-labelledby="Input form for card"
      >
        <FormHeader title={title} onClose={exit} />
        {fields.map((input) => (
          <Input
            key={input.key}
            input={input}
            register={register}
            setFocus={setFocus}
            formType={id}
            defaultValues={defaultValues}
          />
        ))}
        <div>
          <label className="flex justify-between" htmlFor="date">
            <span>
              Date:
              {id === "add" && <span className="text-red-400 ml-1">*</span>}
            </span>
            {errors.date && (
              <span className="text-red-400">{errors.date.message}</span>
            )}
          </label>
          <input
            className={`${theme === "dark" ? "border-gray-700 focus:outline-gray-800" : "border-gray-300 focus:outline-gray-400"} border rounded-md mt-1 mb-3 h-8 w-full p-4 `}
            id="data"
            type="date"
            aria-required
            autoComplete="off"
            defaultValue={defaultValues?.date?.split("T")[0] || ""}
            {...register("date")}
          />
        </div>
        <label className="flex justify-between" htmlFor="status">
          <span>
            Status:{" "}
            {id === "add" && <span className="text-red-400 ml-1">*</span>}
          </span>
          {errors.status && (
            <p className="text-red-400">{errors.status.message}</p>
          )}
        </label>
        <select
          id="status"
          {...register("status")}
          className={`block w-full  border rounded-md mt-1 mb-3 h-10 px-4 mr-4 ${theme === "dark" ? "border-gray-600 focus:outline-gray-600 " : "border-gray-300 focus:outline-gray-400"} `}
          defaultValue={defaultValues?.status || defaultLabel || ""}
        >
          <LabelOptions />
        </select>
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          {...register("notes")}
          defaultValue={defaultValues?.notes || ""}
          className={`block w-full  border rounded-md mt-1 mb-3 h-20 p-4 ${theme === "dark" ? "border-gray-600 focus:outline-gray-600" : "border-gray-300 focus:outline-gray-400"} `}
        />

        <FormButton successActionName={submitLabel} onClose={exit} />
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full z-90 bg-black/50 text-white flex items-center justify-center gap-4">
            <BeatLoader color="#ffff" size={10} />
            Processing…
          </div>
        )}
      </form>
    </ModalContainer>
  );
};

export default Form;
