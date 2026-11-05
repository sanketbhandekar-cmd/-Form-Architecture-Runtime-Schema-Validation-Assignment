import React from "react";
import { useWatch } from "react-hook-form";
import {
  CheckboxField,
  SelectField,
  TextAreaField,
  TextField,
} from "../../../../components/form";

// Isolated counter using useWatch so typing in textarea does not re-render the step
const CoverNoteCounter: React.FC = () => {
  const text = useWatch({ name: "coverNote" }) as string | undefined;
  const count = text ? text.length : 0;
  return (
    <span style={{ fontSize: "12px", color: count > 1000 ? "red" : "#666" }}>
      {count} / 1000 characters
    </span>
  );
};

export const Step4ApplicationDetails: React.FC = () => {
  return (
    <div>
      <h3>Step 4: Application Details</h3>

      <SelectField
        name="positionAppliedFor"
        label="Position Applied For"
        options={[
          { value: "Frontend Developer", label: "Frontend Developer" },
          { value: "Backend Developer", label: "Backend Developer" },
          { value: "Full Stack Engineer", label: "Full Stack Engineer" },
          { value: "QA Engineer", label: "QA Engineer" },
        ]}
        required
      />

      <TextField
        name="expectedJoiningDate"
        type="date"
        label="Expected Joining Date (must be in future)"
        required
      />

      <TextField
        name="portfolioUrl"
        type="url"
        label="Portfolio Link (Optional)"
        placeholder="https://..."
      />

      <TextAreaField
        name="coverNote"
        label="Cover Note (Optional)"
        placeholder="Write a brief cover note..."
        rows={4}
        footer={<CoverNoteCounter />}
      />

      <CheckboxField
        name="agreeToTerms"
        label="I accept the company terms and conditions."
        required
      />
    </div>
  );
};
