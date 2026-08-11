import { useState } from 'react';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import showToast from '../Helpers/SweetAlert';
import getApiErrorMessage from '../Network/apiError';
import { register } from '../Network/appApis';
import { RegisterFormValues } from '../types/auth';
import { validateRegistration } from '../auth/auth.validation';

const initialValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const fieldLabels = {
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
};

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="mb-4 text-center">Create account</h1>
          <Formik
            initialValues={initialValues}
            validate={validateRegistration}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const request = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                };
                await register(request);
                showToast(
                  'success',
                  'Your account has been created. Please log in.'
                );
                navigate('/login');
              } catch (error: unknown) {
                showToast(
                  'error',
                  getApiErrorMessage(error, 'Unable to create your account.')
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                {(['firstName', 'lastName', 'email'] as const).map((name) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">
                      {fieldLabels[name]}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={name === 'email' ? 'email' : 'text'}
                      className="form-control"
                      value={values[name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby={`${name}-error`}
                    />
                    <div id={`${name}-error`} className="text-danger">
                      {touched[name] && errors[name]}
                    </div>
                  </div>
                ))}

                {(['password', 'confirmPassword'] as const).map((name) => {
                  const isConfirmation = name === 'confirmPassword';
                  const shown = isConfirmation
                    ? showConfirmation
                    : showPassword;
                  const toggle = isConfirmation
                    ? setShowConfirmation
                    : setShowPassword;

                  return (
                    <div className="mb-3" key={name}>
                      <label htmlFor={name} className="form-label">
                        {isConfirmation ? 'Confirm password' : 'Password'}
                      </label>
                      <div className="input-group">
                        <input
                          id={name}
                          name={name}
                          type={shown ? 'text' : 'password'}
                          className="form-control"
                          value={values[name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-describedby={`${name}-error`}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => toggle((current) => !current)}
                          aria-label={shown ? `Hide ${name}` : `Show ${name}`}
                        >
                          {shown ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <div id={`${name}-error`} className="text-danger">
                        {touched[name] && errors[name]}
                      </div>
                    </div>
                  );
                })}

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  {isSubmitting ? 'Creating account…' : 'Create account'}
                </button>
              </form>
            )}
          </Formik>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
