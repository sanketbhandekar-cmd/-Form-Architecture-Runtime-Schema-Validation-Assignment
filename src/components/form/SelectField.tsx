import React from "react";
import { useFormContext } from "react-hook-form";
import { getFieldError } from "./form-utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
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
      <select
        id={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name)}
        {...rest}
      >
        <option value="">-- {placeholder} --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error?.message && (
        <span id={`${name}-error`} role="alert" className="error-text">
          {error.message}
        </span>
      )}
    </div>
  );
};
