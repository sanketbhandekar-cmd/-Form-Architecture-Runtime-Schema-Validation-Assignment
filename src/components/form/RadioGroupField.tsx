import React from "react";
import { useFormContext } from "react-hook-form";

interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  name,
  label,
  options,
}) => {
  const { register } = useFormContext();

  return (
    <fieldset className="form-group fieldset-group">
      <legend>{label}</legend>
      <div style={{ display: "flex", gap: "20px", marginTop: "6px" }}>
        {options.map((opt) => (
          <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "normal", cursor: "pointer" }}>
            <input type="radio" value={opt.value} {...register(name)} />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
};
