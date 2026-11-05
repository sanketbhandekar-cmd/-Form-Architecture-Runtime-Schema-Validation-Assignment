import React, { useEffect } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  RadioGroupField,
  SelectField,
  TextField,
} from "../../../../components/form";
import type { JobApplicationFormValues } from "../../schemas";

// Isolated child component using useWatch to prevent re-rendering the parent Step
const ExperienceFields: React.FC = () => {
  const experienceType = useWatch({ name: "experienceType" });
  const { control } = useFormContext<JobApplicationFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousCompanies" as any,
  });

  // Add default row if switched to experienced
  useEffect(() => {
    if (experienceType === "experienced" && fields.length === 0) {
      append({ company: "", role: "", fromDate: "", toDate: "" });
    }
  }, [experienceType, fields.length, append]);

  if (experienceType === "fresher") {
    return (
      <div style={{ marginTop: "12px" }}>
        <SelectField
          name="availabilityToJoin"
          label="Availability to Join"
          options={[
            { value: "immediate", label: "Immediate" },
            { value: "15_days", label: "Within 15 days" },
            { value: "30_days", label: "Within 30 days" },
            { value: "60_days", label: "Within 60 days" },
          ]}
          required
        />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "12px" }}>
      <TextField
        name="totalExperience"
        label="Total Experience (Years)"
        placeholder="e.g. 2"
        required
      />

      <SelectField
        name="noticePeriod"
        label="Notice Period"
        options={[
          { value: "0", label: "Immediate (0 days)" },
          { value: "15", label: "15 Days" },
          { value: "30", label: "30 Days" },
          { value: "60", label: "60 Days" },
          { value: "90", label: "90 Days" },
        ]}
        required
      />

      <h4 style={{ margin: "16px 0 8px" }}>Previous Companies</h4>

      {fields.map((field, index) => (
        <div key={field.id} className="field-card">
          <div className="card-header">
            <strong>Company #{index + 1}</strong>
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

          <TextField
            name={`previousCompanies.${index}.company`}
            label="Company Name"
            required
          />
          <TextField
            name={`previousCompanies.${index}.role`}
            label="Role / Designation"
            required
          />
          <TextField
            name={`previousCompanies.${index}.fromDate`}
            type="date"
            label="From Date"
            required
          />
          <TextField
            name={`previousCompanies.${index}.toDate`}
            type="date"
            label="To Date (Must be after From Date)"
            required
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ company: "", role: "", fromDate: "", toDate: "" })
        }
        className="btn btn-secondary"
        style={{ marginTop: "10px" }}
      >
        + Add Company
      </button>
    </div>
  );
};

export const Step3Experience: React.FC = () => {
  return (
    <div>
      <h3>Step 3: Work Experience</h3>
      <RadioGroupField
        name="experienceType"
        label="Select Candidate Status"
        options={[
          { value: "fresher", label: "Fresher" },
          { value: "experienced", label: "Experienced" },
        ]}
      />
      <ExperienceFields />
    </div>
  );
};
