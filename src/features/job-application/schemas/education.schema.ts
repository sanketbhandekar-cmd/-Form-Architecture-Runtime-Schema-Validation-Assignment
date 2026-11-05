import { z } from "zod";

export const qualificationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  yearOfPassing: z.string().regex(/^(19|20)\d{2}$/, "Enter a valid 4-digit year"),
  percentage: z.string().regex(/^(\d{1,2}(\.\d{1,2})?|100(\.00?)?)$/, "Enter a valid percentage (0-100)"),
});

export const educationSchema = z.object({
  education: z.array(qualificationSchema).min(1, "At least one qualification is required"),
});

export type QualificationValues = z.infer<typeof qualificationSchema>;
export type EducationValues = z.infer<typeof educationSchema>;
