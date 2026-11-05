import { z } from "zod";

export const applicationDetailsSchema = z.object({
  positionAppliedFor: z.string().min(1, "Please select a position"),
  expectedJoiningDate: z.string().min(1, "Expected joining date is required"),
  portfolioUrl: z.string().optional(),
  coverNote: z.string().max(1000, "Cover note cannot exceed 1000 characters").optional(),
  agreeToTerms: z.literal(true, {
    error: "You must accept the terms and conditions",
  }),
});

export type ApplicationDetailsValues = z.infer<typeof applicationDetailsSchema>;
