import { z } from "zod";
import { personalDetailsSchema } from "./personalDetails.schema";
import { educationSchema } from "./education.schema";
import { experienceSchema } from "./experience.schema";
import { applicationDetailsSchema } from "./applicationDetails.schema";

// Rule 1: candidate must be 18 or older
function isAtLeast18(dobString: string): boolean {
  if (!dobString) return false;
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age >= 18;
}

// Rule 3: expected joining date must be in the future
function isFutureDate(dateStr: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) > new Date();
}

// Root schema combining all steps
export const jobApplicationSchema = z
  .object({
    ...personalDetailsSchema.shape,
    ...educationSchema.shape,
    ...applicationDetailsSchema.shape,
  })
  .and(experienceSchema)
  // Cross-Field Rule 1: Candidate must be 18 or older
  .refine((data) => isAtLeast18(data.dateOfBirth), {
    message: "Candidate must be at least 18 years old",
    path: ["dateOfBirth"],
  })
  // Cross-Field Rule 3: Expected joining date must be in future
  .refine((data) => isFutureDate(data.expectedJoiningDate), {
    message: "Expected joining date must be in the future",
    path: ["expectedJoiningDate"],
  });

// Single source of truth type inferred from schema
export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;

// Default values for useForm
export const defaultJobApplicationValues: JobApplicationFormValues = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  currentCity: "",
  education: [
    { degree: "", institution: "", yearOfPassing: "", percentage: "" },
  ],
  experienceType: "fresher",
  availabilityToJoin: "immediate",
  positionAppliedFor: "",
  expectedJoiningDate: "",
  portfolioUrl: "",
  coverNote: "",
  agreeToTerms: false as unknown as true,
};
