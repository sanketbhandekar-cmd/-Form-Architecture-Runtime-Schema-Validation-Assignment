import type { JobApplicationFormValues } from "../schemas";

export type ApiOutcome = "success" | "field_error" | "server_error";

// Mock API function that pauses 1.5 seconds and simulates three outcomes
export async function submitJobApplication(
  _data: JobApplicationFormValues,
  outcome: ApiOutcome = "success"
) {
  // Pause for ~1.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (outcome === "field_error") {
    return {
      status: 400,
      ok: false as const,
      message: "Server validation failed.",
      errors: {
        email: "This email address is already registered in our system.",
      },
    };
  }

  if (outcome === "server_error") {
    return {
      status: 500,
      ok: false as const,
      message: "Server error (500): Could not save application. Please try again.",
    };
  }

  return {
    status: 200,
    ok: true as const,
    message: "Application submitted successfully!",
  };
}
