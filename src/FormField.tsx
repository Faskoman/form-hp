import { PropsWithChildren } from "react";

type FormFieldProps = {
  htmlFor?: string;
  label: string;
  error?: string;
};

export default function FormField({
  htmlFor,
  label,
  error,
  children,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      <p className="error-message">{error || " "}</p>
    </div>
  );
}