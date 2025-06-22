import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import { Toast } from "../Helpers/SweetAlert";
import { login } from "../Network/appApis";
import { useState } from "react";
import { useAuth } from '../Context/auth';

function Login() {

    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    return ( 
        <>
            <div className="container d-flex justify-content-center align-items-center flex-wrap">
                <div className="my-4" style={{ borderRadius: "25px" }}>
                    <div className="p-md-5 row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-12 order-2">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        LOGIN
                        </p>
                        <Formik
                        initialValues={{ email: "", password: "" }}
                        validate={(values) => {
                            const errors: any = {};
                            if (!values.email) {
                            errors.email = "Email is Required";
                            } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                            )
                            ) {
                            errors.email = "Invalid Email Address";
                            }
                            if (!values.password) {
                            errors.password = "Password is Required";
                            }
                            return errors;
                        }}
                        onSubmit={(values: {email: string, password: string}, { setSubmitting }) => {
                            (async function () {
                            try {
                                const res = await login(values);
                                if (res.status === 200) {
                                if (auth) {auth?.loginContext(res.data.token, res.data._id)}
                                Toast(
                                    "success",
                                    `Successfully Logged in! Welcome Back ${res.data.firstName} ${res.data.lastName}`
                                );
                                navigate("/");
                                }
                            } catch (err: any) {
                                Toast("error", `${err.response.data.message}`);
                            }
                            })();
                            setSubmitting(false);
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
                            <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                            <div className="d-flex flex-row align-items-center mb-1">
                                <EmailIcon className="m-1" />
                                <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email Address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                />
                            </div>
                            <span
                                style={{ color: "red", marginLeft: "30px" }}
                                className="p-1 text-bold"
                            >
                                {errors.email && touched.email && errors.email}
                            </span>

                            <div className="input-group d-flex flex-row align-items-center mb-1">
                                <LockIcon className="m-1"/>
                                <input
                                type={passwordShown ? "text" : "password"}
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                />
                                <span 
                                onClick={()=>setPasswordShown(!passwordShown)}
                                style={{cursor:'pointer'}}
                                className="input-group-text">
                                {passwordShown ? <VisibilityOff/> : <Visibility/>}
                                </span>
                            </div>

                            <span
                                style={{ color: "red", marginLeft: "30px" }}
                                className="p-1 text-bold"
                            >
                                {errors.password && touched.password && errors.password}
                            </span>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button
                                disabled={isSubmitting}
                                type="submit"
                                className="btn btn-dark"
                                >
                                LOGIN
                                </button>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <h6
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/register")}
                                className="my-2"
                                >
                                DO NOT HAVE AN ACCOUNT? REGISTER
                                </h6>
                            </div>
                            </form>
                        )}
                        </Formik>
                    </div>
                    <div className="col-md-10 col-lg-6 col-12 d-flex align-items-center order-1">
                        <img
                        src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
                        className="img-fluid"
                        alt=""
                        />
                    </div>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default Login;