import * as yup from "yup";

const disordersValidation = yup
  .array()
  .of(yup.string())
  .test(
    "at-least-one",
    "At least one disorder must be selected",
    (value = []) => value.length > 0
  );

const workspacesValidation = yup
  .array()
  .of(yup.string().required("Workspace cannot be empty"));

export const patientSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  gender: yup.string().required("Gender is required"),
  birthDate: yup.date().nullable().required("Date of Birth is required"),
  disorders: disordersValidation.required(
    "At least one disorder must be selected"
  ),
  workspaces: workspacesValidation,
});
