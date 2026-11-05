import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TextField, getFieldError } from "../../../../components/form";
import type { JobApplicationFormValues } from "../../schemas";

export const Step2Education: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JobApplicationFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const arrayError = getFieldError(errors, "education")?.message;

  return (
    <div>
      <h3>Step 2: Educational Qualifications</h3>

      {arrayError && (
        <p role="alert" className="error-text" style={{ marginBottom: "10px" }}>
          {arrayError}
        </p>
      )}

      {fields.map((field, index) => (
        // Keyed on field.id as required by React Hook Form
        <div key={field.id} className="field-card">
          <div className="card-header">
            <strong>Qualification #{index + 1}</strong>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            )}
          </div>

          <TextField name={`education.${index}.degree`} label="Degree" required />
          <TextField name={`education.${index}.institution`} label="Institution" required />
          <TextField name={`education.${index}.yearOfPassing`} label="Year of Passing (e.g. 2023)" required />
          <TextField name={`education.${index}.percentage`} label="Percentage (0-100)" required />
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ degree: "", institution: "", yearOfPassing: "", percentage: "" })
        }
        className="btn btn-secondary"
        style={{ marginTop: "10px" }}
      >
        + Add Qualification
      </button>
    </div>
  );
};
