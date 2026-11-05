import React from "react";
import { useFormContext } from "react-hook-form";
import { getFieldError } from "./form-utils";

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: React.ReactNode;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
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
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          id={name}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name)}
          {...rest}
        />
        <label htmlFor={name} style={{ margin: 0, fontWeight: "normal" }}>
          {label} {required && <span className="req">*</span>}
        </label>
      </div>
      {error?.message && (
        <span id={`${name}-error`} role="alert" className="error-text">
          {error.message}
        </span>
      )}
    </div>
  );
};
