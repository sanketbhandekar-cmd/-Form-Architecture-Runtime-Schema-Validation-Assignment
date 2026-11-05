import { z } from "zod";

// Rule 2: Company 'to' date must be after 'from' date
export const previousCompanySchema = z
  .object({
    company: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
    fromDate: z.string().min(1, "Start date is required"),
    toDate: z.string().min(1, "End date is required"),
  })
  .refine(
    (data) => {
      if (!data.fromDate || !data.toDate) return true;
      return new Date(data.toDate) > new Date(data.fromDate);
    },
    {
      message: "End date ('to') must be after start date ('from')",
      path: ["toDate"],
    }
  );

// Fresher branch
export const fresherExperienceSchema = z.object({
  experienceType: z.literal("fresher"),
  availabilityToJoin: z.string().min(1, "Availability to join is required"),
});

// Experienced branch
export const experiencedExperienceSchema = z.object({
  experienceType: z.literal("experienced"),
  totalExperience: z.string().min(1, "Total experience is required"),
  noticePeriod: z.string().min(1, "Notice period is required"),
  previousCompanies: z
    .array(previousCompanySchema)
    .min(1, "At least one previous company is required"),
});

// Discriminated union
export const experienceSchema = z.discriminatedUnion("experienceType", [
  fresherExperienceSchema,
  experiencedExperienceSchema,
]);

export type PreviousCompanyValues = z.infer<typeof previousCompanySchema>;
export type FresherExperienceValues = z.infer<typeof fresherExperienceSchema>;
export type ExperiencedExperienceValues = z.infer<typeof experiencedExperienceSchema>;
export type ExperienceValues = z.infer<typeof experienceSchema>;
