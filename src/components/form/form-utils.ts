import type { FieldErrors } from "react-hook-form";

// Helper to get error message for normal or nested field names (e.g. education.0.degree)
export function getFieldError(
  errors: FieldErrors | undefined,
  name: string
): { message?: string } | undefined {
  if (!errors || !name) return undefined;

  const parts = name.replace(/\[(\w+)\]/g, ".$1").split(".");
  let current: any = errors;

  for (const part of parts) {
    if (!current) return undefined;
    current = current[part];
  }

  return current && typeof current.message === "string" ? current : undefined;
}
