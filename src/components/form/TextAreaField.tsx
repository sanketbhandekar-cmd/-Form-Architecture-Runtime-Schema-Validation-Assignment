import React from "react";
import { useFormContext } from "react-hook-form";
import { getFieldError } from "./form-utils";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  footer?: React.ReactNode;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  footer,
  rows = 4,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getFieldError(errors, name);

  return (
    <div className="form-group">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label htmlFor={name}>{label}</label>
        {footer}
      </div>
      <textarea
        id={name}
        rows={rows}
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
