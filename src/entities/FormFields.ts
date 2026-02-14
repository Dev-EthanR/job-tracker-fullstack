import type { FieldError } from "react-hook-form";
import type { FormDataShape } from "@/src/utilities/schema";

export default interface FormFields {
  name: string;
  key: keyof FormDataShape;
  type: string;
  error?: FieldError;
}
