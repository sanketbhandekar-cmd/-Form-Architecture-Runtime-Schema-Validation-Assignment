# Job Application Form (React Hook Form + Zod)

## 1. How to Run the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript check and build
npm run build

# Run linter
npm run lint
```

---

## 2. How You Organized Your Schema Files

Schemas are organized by feature inside `src/features/job-application/schemas/`:

```
src/features/job-application/schemas/
├── personalDetails.schema.ts     # Step 1: Personal details schema
├── education.schema.ts           # Step 2: Qualification list schema (at least 1 entry required)
├── experience.schema.ts          # Step 3: Discriminated union for Fresher vs Experienced
├── applicationDetails.schema.ts  # Step 4: Position, dates, cover note, terms
├── jobApplication.schema.ts      # Merged root schema with cross-field rules and inferred types
└── index.ts
```

- **Single Source of Truth**: All validation rules live in Zod schemas.
- **Inferred Types**: TypeScript types are generated using `z.infer<typeof jobApplicationSchema>` with no hand-written types duplicating the schema.
- **Discriminated Union**: Step 3 models the Fresher / Experienced split with `z.discriminatedUnion("experienceType", [...])`.
- **Three Cross-Field Rules**:
  1. Candidate must be 18 or older (`dateOfBirth` vs current date).
  2. Previous company's "to" date must be after its "from" date (`toDate > fromDate`).
  3. Expected joining date must be in the future (`expectedJoiningDate > today`).

---

## 3. Which Validation Mode You Chose and Why

We chose:
```ts
mode: "onTouched"
```

### Why:
As recommended in Module 2.5 of the training material, `onTouched` gives the best user experience for a multi-step form:
- It does not distract the user with errors while they type in a field for the first time.
- It validates immediately once the field loses focus (blur).
- After a field is touched, any subsequent change is validated live.

---

## 4. Where Form State Lives and How the Steps Share It

- **Single Form Instance**: Form state lives in a single `useForm` instance at the wizard root (`JobApplicationWizard.tsx`) wrapped in `<FormProvider {...methods}>`.
- **Shared via Context**: Step components access form methods and errors via `useFormContext()`.
- **No External State**: Form values are not stored in Redux, Zustand, or custom React Context.
- **Data Preserved on Navigation**: When navigating back or clicking "Edit" from the review step, all form values are already preserved in the form instance.
- **Step Validation**: Moving to the next step calls `await trigger(stepFields)` for the current step's fields only.

---

## 5. Two or Three Places Where You Deliberately Avoided an Unnecessary Re-render

1. **Isolated `ExperienceFields` with `useWatch`**:
   In Step 3, instead of calling `watch()` at the top of the step, conditional fields are placed in a child component subscribing only to `useWatch({ name: "experienceType" })`. Selecting Fresher or Experienced only re-renders that small child component rather than the whole step.
2. **Isolated `CoverNoteCounter` with `useWatch`**:
   In Step 4, character counting for the cover note is isolated into a child `<CoverNoteCounter />` subscribing to `useWatch({ name: "coverNote" })`. Typing in the textarea only re-renders the counter, not the rest of Step 4.
3. **Uncontrolled Inputs via `register`**:
   Native inputs bind through refs using `{...register(name)}`. Typing does not trigger React component re-renders.
4. **Step 5 Review Summary using `getValues()`**:
   Step 5 reads values at render time using `getValues()` rather than subscribing with `watch()`, eliminating unnecessary re-renders.

---

## 6. Anything Left Incomplete

Nothing is left incomplete. All 5 steps, dynamic field lists, discriminated union, cross-field validations, accessibility requirements, and the mock API simulating the three outcomes (200 success, 400 validation error, 500 server error) are fully implemented and functional.
