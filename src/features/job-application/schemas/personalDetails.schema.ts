import { z } from "zod";

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^[0-9+\-\s()]{10,15}$/, "Enter a valid phone number (10-15 digits)"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  currentCity: z.string().min(2, "Current city is required"),
});

export type PersonalDetailsValues = z.infer<typeof personalDetailsSchema>;
