import React from "react";
import { TextField } from "../../../../components/form";

export const Step1PersonalDetails: React.FC = () => {
  return (
    <div>
      <h3>Step 1: Personal Details</h3>
      <TextField name="fullName" label="Full Name" required />
      <TextField name="email" type="email" label="Email Address" required />
      <TextField name="phone" type="tel" label="Phone Number" required />
      <TextField name="dateOfBirth" type="date" label="Date of Birth (must be 18+)" required />
      <TextField name="currentCity" label="Current City" required />
    </div>
  );
};
