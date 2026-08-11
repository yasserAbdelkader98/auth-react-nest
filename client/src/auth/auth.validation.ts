import { FormikErrors } from 'formik';
import { LoginRequest, RegisterFormValues } from '../types/auth';

export function validateLogin(
  values: LoginRequest
): FormikErrors<LoginRequest> {
  const errors: FormikErrors<LoginRequest> = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

export function validateRegistration(
  values: RegisterFormValues
): FormikErrors<RegisterFormValues> {
  const errors: FormikErrors<RegisterFormValues> = {};

  if (!values.firstName) errors.firstName = 'First name is required';
  else if (values.firstName.length < 3)
    errors.firstName = 'Minimum 3 characters required';

  if (!values.lastName) errors.lastName = 'Last name is required';
  else if (values.lastName.length < 3)
    errors.lastName = 'Minimum 3 characters required';

  if (!values.email) errors.email = 'Email is required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) errors.password = 'Password is required';
  else if (values.password.length < 8)
    errors.password = 'Minimum 8 characters required';
  else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(values.password)
  ) {
    errors.password = 'Include uppercase, lowercase, number, and symbol';
  }

  if (!values.confirmPassword)
    errors.confirmPassword = 'Password confirmation is required';
  else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}
