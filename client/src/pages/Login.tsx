import { useState } from 'react';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth';
import showToast from '../Helpers/SweetAlert';
import getApiErrorMessage from '../Network/apiError';
import { login } from '../Network/appApis';
import { LoginRequest } from '../types/auth';
import { validateLogin } from '../auth/auth.validation';

const initialValues: LoginRequest = { email: '', password: '' };

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <h1 className="mb-4 text-center">Login</h1>
          <Formik
            initialValues={initialValues}
            validate={validateLogin}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await login(values);
                auth.login(response.data);
                showToast(
                  'success',
                  `Welcome back ${response.data.firstName} ${response.data.lastName}`
                );
                navigate('/');
              } catch (error: unknown) {
                showToast(
                  'error',
                  getApiErrorMessage(
                    error,
                    'Unable to log in. Please try again.'
                  )
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
                <div className="mb-3">
                  <div className="form-label">Email</div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    aria-describedby="email-error"
                    aria-label="Email"
                  />
                  <div id="email-error" className="text-danger">
                    {touched.email && errors.email}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-label">Password</div>
                  <div className="input-group">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      aria-describedby="password-error"
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword((shown) => !shown)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div id="password-error" className="text-danger">
                    {touched.password && errors.password}
                  </div>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  {isSubmitting ? 'Logging in…' : 'Login'}
                </button>
              </form>
            )}
          </Formik>

          <p className="mt-3 text-center">
            Do not have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
