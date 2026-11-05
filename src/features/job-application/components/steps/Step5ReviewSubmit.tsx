import React from "react";
import { useFormContext } from "react-hook-form";
import type { JobApplicationFormValues } from "../../schemas";
import type { ApiOutcome } from "../../services/jobApplication.api";

interface Step5ReviewSubmitProps {
  onEditStep: (step: number) => void;
  apiOutcome: ApiOutcome;
  onOutcomeChange: (outcome: ApiOutcome) => void;
  serverError: string | null;
}

export const Step5ReviewSubmit: React.FC<Step5ReviewSubmitProps> = ({
  onEditStep,
  apiOutcome,
  onOutcomeChange,
  serverError,
}) => {
  const { getValues } = useFormContext<JobApplicationFormValues>();
  const values = getValues();

  return (
    <div>
      <h3>Step 5: Review & Submit</h3>

      {serverError && (
        <div className="alert alert-error" role="alert">
          <strong>Server Error:</strong> {serverError}
        </div>
      )}

      {/* Simple control for testing the 3 required API outcomes */}
      <div className="simulation-box">
        <label htmlFor="api-outcome-select">
          <strong>Simulate Mock API Response (1.5s delay):</strong>
        </label>
        <select
          id="api-outcome-select"
          value={apiOutcome}
          onChange={(e) => onOutcomeChange(e.target.value as ApiOutcome)}
          style={{ marginLeft: "10px", padding: "4px 8px" }}
        >
          <option value="success">Success (200 OK)</option>
          <option value="field_error">Field Validation Error (400 Bad Request)</option>
          <option value="server_error">Server Error (500 Internal Error)</option>
        </select>
      </div>

      {/* Section 1: Personal Details */}
      <div className="review-section">
        <div className="review-header">
          <strong>1. Personal Details</strong>
          <button type="button" onClick={() => onEditStep(0)} className="btn-link">
            Edit
          </button>
        </div>
        <p><strong>Name:</strong> {values.fullName || "—"}</p>
        <p><strong>Email:</strong> {values.email || "—"}</p>
        <p><strong>Phone:</strong> {values.phone || "—"}</p>
        <p><strong>Date of Birth:</strong> {values.dateOfBirth || "—"}</p>
        <p><strong>Current City:</strong> {values.currentCity || "—"}</p>
      </div>

      {/* Section 2: Education */}
      <div className="review-section">
        <div className="review-header">
          <strong>2. Education</strong>
          <button type="button" onClick={() => onEditStep(1)} className="btn-link">
            Edit
          </button>
        </div>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Institution</th>
              <th>Year</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {values.education?.map((edu, i) => (
              <tr key={i}>
                <td>{edu.degree}</td>
                <td>{edu.institution}</td>
                <td>{edu.yearOfPassing}</td>
                <td>{edu.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Experience */}
      <div className="review-section">
        <div className="review-header">
          <strong>3. Experience ({values.experienceType})</strong>
          <button type="button" onClick={() => onEditStep(2)} className="btn-link">
            Edit
          </button>
        </div>
        {values.experienceType === "fresher" ? (
          <p><strong>Availability to Join:</strong> {values.availabilityToJoin}</p>
        ) : (
          <div>
            <p><strong>Total Experience:</strong> {values.totalExperience} years</p>
            <p><strong>Notice Period:</strong> {values.noticePeriod} days</p>
            <h5 style={{ margin: "8px 0 4px" }}>Previous Companies:</h5>
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {values.previousCompanies?.map((comp, i) => (
                  <tr key={i}>
                    <td>{comp.company}</td>
                    <td>{comp.role}</td>
                    <td>{comp.fromDate}</td>
                    <td>{comp.toDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section 4: Application Details */}
      <div className="review-section">
        <div className="review-header">
          <strong>4. Application Details</strong>
          <button type="button" onClick={() => onEditStep(3)} className="btn-link">
            Edit
          </button>
        </div>
        <p><strong>Position:</strong> {values.positionAppliedFor || "—"}</p>
        <p><strong>Expected Joining Date:</strong> {values.expectedJoiningDate || "—"}</p>
        <p><strong>Portfolio:</strong> {values.portfolioUrl || "None"}</p>
        <p><strong>Cover Note:</strong> {values.coverNote || "None"}</p>
        <p><strong>Terms Accepted:</strong> {values.agreeToTerms ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};
