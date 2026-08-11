import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import Person3Icon from '@mui/icons-material/Person3';
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import { Toast } from "../Helpers/SweetAlert";
import { addUser } from "../Network/appApis";
import { useState } from "react";
import { User } from "../InterFaces/User.interface";

function Register() {

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const Navigate = useNavigate()

    return ( 
        <>
            <div className="container d-flex justify-content-center align-items-center flex-wrap">
                <div className="my-4" style={{ borderRadius: "25px" }}>
                    <div className="p-md-5 row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-12">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        New Account
                        </p>
                        <Formik
                    initialValues={{ email: "", firstName: "",lastName: "", password:"", confirmPassword:"" }}
                    validate={(values) => {
                        const errors: User = {};
                        if (!values.email) {
                            errors.email = "Email is Required";
                        } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = "Invalid Email Address";
                        }
                        
                        if (!values.firstName) {
                            errors.firstName = "First Name is Required";
                        }else if (values.firstName.length < 3) {
                            errors.firstName = "Minimum 3 Characters Required";
                        }

                        if (!values.lastName) {
                            errors.lastName = "Last Name is Required";
                        }else if (values.lastName.length < 3) {
                            errors.lastName = "Minimum 3 Characters Required";
                        }

                        if (!values.password) {
                            errors.password = "Password is Required";
                        }else if (values.password.length < 8){
                            errors.password = "Minimum 8 Characters Required";
                        }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/i.test(values.password)){
                            errors.password = "at least one uppercase, lowercase, symbol and number should be provided";
                        }
                        
                        if (!values.confirmPassword) {
                            errors.confirmPassword = "Password Confirmation is Required";
                        }else if (values.confirmPassword !== values.password){
                            errors.confirmPassword = "Password Not Identical";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        (async function(){
                        try{
                            let {confirmPassword, ...obj} = values
                            const res = await addUser(obj);
                            if(res.status === 201){
                                Toast('success',`Welcome ${values.firstName} ${values.lastName}!Your Account has been created, Login to proceed`)
                                Navigate('/login')
                            }
                        }catch(err: any){
                            console.log(err)
                            Toast('error',`${err.response.data.message}`)
                        }
                        })()
            
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
                    }) => (<form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        
                        <div className='d-flex justify-content-between align-items-center mb-1'>
                        <div>
                        <div className="d-flex flex-row align-items-center mb-1">
                            <PersonIcon className="m-1" />
                            <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="First Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            />
                        </div>
                            <span style={{ color: "red",marginLeft:'30px' }} className="p-1 text-bold">
                                {errors.firstName && touched.firstName && errors.firstName}
                            </span>
                            </div>

                            <div>
                            <div className="d-flex flex-row align-items-center mb-1">
                                <Person3Icon className="m-1" />
                                <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                placeholder="Last Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                />
                            </div>
                                <span style={{ color: "red",marginLeft:'30px' }} className="p-1 text-bold">
                                    {errors.lastName && touched.lastName && errors.lastName}
                                </span>
                                </div>    
                        </div>

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
                            <span style={{ color: "red",marginLeft:'30px' }} className="p-1 text-bold">
                                {errors.email && touched.email && errors.email}
                            </span>

                        <div className="input-group d-flex flex-row align-items-center mb-1">
                            <LockIcon className="m-1" />
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
                            <span style={{ color: "red",marginLeft:'30px' }} className="p-1 text-bold">
                                {errors.password && touched.password && errors.password}
                            </span>

                        <div className="input-group d-flex flex-row align-items-center mb-1">
                            <Key className="m-1" />
                            <input
                            type={confirmPasswordShown ? "text" : "password"}
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm your password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            />
                            <span 
                                onClick={()=>setConfirmPasswordShown(!passwordShown)}
                                style={{cursor:'pointer'}}
                                className="input-group-text">
                                {confirmPasswordShown ? <VisibilityOff/> : <Visibility/>}
                                </span>
                        </div>
                            <span style={{ color: "red",marginLeft:'30px' }} className="p-1 text-bold">
                                {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                            </span>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button disabled={isSubmitting} type='submit' className="btn btn-dark">
                            Create New Account
                            </button>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <h6 style={{cursor:'pointer'}} onClick={()=>Navigate('/login')} className="my-2">ALREADY HAVE AN ACCOUNT? LOGIN</h6>
                        </div>
                        </form>
                        )}
                        </Formik>
                    </div>
                    <div className="col-md-10 col-lg-6 col-12 d-flex align-items-center">
                        <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

export default Register;