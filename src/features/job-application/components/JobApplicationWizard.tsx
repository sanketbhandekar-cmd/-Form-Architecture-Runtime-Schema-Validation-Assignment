import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultJobApplicationValues,
  jobApplicationSchema,
  type JobApplicationFormValues,
} from "../schemas";
import {
  submitJobApplication,
  type ApiOutcome,
} from "../services/jobApplication.api";
import { Step1PersonalDetails } from "./steps/Step1PersonalDetails";
import { Step2Education } from "./steps/Step2Education";
import { Step3Experience } from "./steps/Step3Experience";
import { Step4ApplicationDetails } from "./steps/Step4ApplicationDetails";
import { Step5ReviewSubmit } from "./steps/Step5ReviewSubmit";

const STEP_NAMES = [
  "Personal Details",
  "Education",
  "Experience",
  "Application Details",
  "Review & Submit",
];

export const JobApplicationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [apiOutcome, setApiOutcome] = useState<ApiOutcome>("success");
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Single useForm instance holding all state across wizard steps
  const methods = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: defaultJobApplicationValues,
    mode: "onTouched",
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    setError,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Move to next step after validating current step
  const handleNext = async () => {
    setServerError(null);

    let fieldsToValidate: any[] = [];
    if (currentStep === 0) {
      fieldsToValidate = ["fullName", "email", "phone", "dateOfBirth", "currentCity"];
    } else if (currentStep === 1) {
      fieldsToValidate = ["education"];
    } else if (currentStep === 2) {
      const expType = getValues("experienceType");
      fieldsToValidate =
        expType === "fresher"
          ? ["experienceType", "availabilityToJoin"]
          : ["experienceType", "totalExperience", "noticePeriod", "previousCompanies"];
    } else if (currentStep === 3) {
      fieldsToValidate = [
        "positionAppliedFor",
        "expectedJoiningDate",
        "agreeToTerms",
      ];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Accessibility: focus first invalid field on failure
      setTimeout(() => {
        const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
        if (firstInvalid) firstInvalid.focus();
      }, 50);
    }
  };

  const handleBack = () => {
    setServerError(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Submission handler
  const onSubmit = async (data: JobApplicationFormValues) => {
    setServerError(null);

    try {
      const res = await submitJobApplication(data, apiOutcome);

      // Outcome 1: HTTP 200 Success
      if (res.status === 200 && res.ok) {
        setIsSubmitted(true);
        return;
      }

      // Outcome 2: HTTP 400 Field Validation Error
      if (res.status === 400 && "errors" in res && res.errors) {
        Object.entries(res.errors).forEach(([field, msg]) => {
          setError(field as any, { type: "server", message: msg as string });
        });
        // Jump to Step 1 where email field is located
        setCurrentStep(0);
        setTimeout(() => {
          const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
          if (firstInvalid) firstInvalid.focus();
        }, 50);
        return;
      }

      // Outcome 3: HTTP 500 Server Error
      if (res.status === 500) {
        setServerError(res.message);
      }
    } catch {
      setServerError("Network error. Please try again.");
    }
  };

  // If submitted, show success message
  if (isSubmitted) {
    return (
      <div className="wizard-box" style={{ textAlign: "center" }}>
        <h2 style={{ color: "#16a34a" }}>Application Submitted Successfully!</h2>
        <p>Thank you for submitting your job application. We will get back to you soon.</p>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginTop: "16px" }}
          onClick={() => {
            reset(defaultJobApplicationValues);
            setIsSubmitted(false);
            setCurrentStep(0);
            setApiOutcome("success");
          }}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="wizard-box">
      <h2>Job Application Form</h2>

      {/* Stepper navigation */}
      <div className="stepper" role="tablist">
        {STEP_NAMES.map((title, i) => (
          <button
            key={title}
            type="button"
            className={`step-btn ${currentStep === i ? "active" : ""}`}
            onClick={() => i < currentStep && setCurrentStep(i)}
            disabled={i > currentStep}
          >
            {i + 1}. {title}
          </button>
        ))}
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {currentStep === 0 && <Step1PersonalDetails />}
          {currentStep === 1 && <Step2Education />}
          {currentStep === 2 && <Step3Experience />}
          {currentStep === 3 && <Step4ApplicationDetails />}
          {currentStep === 4 && (
            <Step5ReviewSubmit
              onEditStep={(stepIndex) => setCurrentStep(stepIndex)}
              apiOutcome={apiOutcome}
              onOutcomeChange={setApiOutcome}
              serverError={serverError}
            />
          )}

          <div className="wizard-footer">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="btn btn-secondary"
              >
                Back
              </button>
            )}

            <div style={{ marginLeft: "auto" }}>
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? "Submitting (1.5s)..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
