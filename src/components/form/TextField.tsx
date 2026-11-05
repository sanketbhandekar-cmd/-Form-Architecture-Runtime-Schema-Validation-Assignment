import React from "react";
import { useFormContext } from "react-hook-form";
import { getFieldError } from "./form-utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  type = "text",
  required,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getFieldError(errors, name);

  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span className="req">*</span>}
      </label>
      <input
        id={name}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name)}
        {...rest}
      />
      {error?.message && (
        <span id={`${name}-error`} role="alert" className="error-text">
          {error.message}
        </span>
      )}
    </div>
  );
};
