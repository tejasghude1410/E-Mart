import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./SignUp1.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = '/signin';
  };

  return (
    <>
      <Formik
        initialValues={{ 
          custName: "", 
          custAddress: "", 
          custPhone: "", 
          custEmail: "", 
          custPassword: "", 
          confirm_password: "", 
          cardHolder: false 
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const response = await fetch("http://localhost:8080/api/Customer", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            alert("Registration Successful");
            navigate('/login');
          } catch (error) {
            console.error("Error:", error);
            alert("Registration failed");
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={Yup.object().shape({
          custName: Yup.string()
            .required("Customer name must be entered")
            .matches(/^[a-zA-Z ]+$/, "Customer name must contain only characters"),
          custAddress: Yup.string()
            .required("Customer Address must be entered"),
          custPhone: Yup.string()
            .required("Customer Phone number must be entered")
            .matches(/^[0-9]+$/, "Phone number must contain only numbers")
            .length(10, "Phone number must be 10 digits"),
          custEmail: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
          custPassword: Yup.string()
            .required("No password provided.")
            .matches(/^[A-Za-z0-9]+$/, "Password must contain only numbers and letters")
            .min(5, "Password is too short - should be 5 chars minimum.")
            .max(10, "Password is too long - should be 10 characters maximum."),
          confirm_password: Yup.string()
            .required("No password provided.")
            .oneOf([Yup.ref('custPassword'), null], "Passwords must match."),
          cardHolder: Yup.boolean()
            .required("Please indicate if the person is a card holder.")
        })}
      >
        {props => {
          const {
            values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit
          } = props;

          const disableStyle = isSubmitting ? { cursor: "not-allowed" } : {};

          return (
            <div className="bg-light min-vh-100 p-5 m-5">
              <h1>Please Register</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="custName">Name</label>
                <input
                  id="custName"
                  name="custName"
                  type="text"
                  placeholder="Enter your name"
                  value={values.custName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.custName && touched.custName && "error"}
                />
                {errors.custName && touched.custName && (
                  <div className="input-feedback">{errors.custName}</div>
                )}

                <label htmlFor="custAddress">Address</label>
                <input
                  id="custAddress"
                  name="custAddress"
                  type="text"
                  placeholder="Enter your Address"
                  value={values.custAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.custAddress && touched.custAddress && "error"}
                />
                {errors.custAddress && touched.custAddress && (
                  <div className="input-feedback">{errors.custAddress}</div>
                )}

                <label htmlFor="custPhone">Phone</label>
                <input
                  id="custPhone"
                  name="custPhone"
                  type="text"
                  placeholder="Enter your Phone number"
                  value={values.custPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.custPhone && touched.custPhone && "error"}
                />
                {errors.custPhone && touched.custPhone && (
                  <div className="input-feedback">{errors.custPhone}</div>
                )}

                <label htmlFor="custEmail">Email</label>
                <input
                  id="custEmail"
                  name="custEmail"
                  type="text"
                  placeholder="Enter your email"
                  value={values.custEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.custEmail && touched.custEmail && "error"}
                />
                {errors.custEmail && touched.custEmail && (
                  <div className="input-feedback">{errors.custEmail}</div>
                )}

                <label htmlFor="custPassword">Password</label>
                <input
                  id="custPassword"
                  name="custPassword"
                  type="password"
                  placeholder="Enter your password"
                  value={values.custPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.custPassword && touched.custPassword && "error"}
                />
                {errors.custPassword && touched.custPassword && (
                  <div className="input-feedback">{errors.custPassword}</div>
                )}

                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm your password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirm_password && touched.confirm_password && "error"}
                />
                {errors.confirm_password && touched.confirm_password && (
                  <div className="input-feedback">{errors.confirm_password}</div>
                )}

                <label htmlFor="cardHolder">Are you a CardHolder</label>
                <input
                  id="cardHolder"
                  name="cardHolder"
                  type="checkbox"
                  checked={values.cardHolder}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cardHolder && touched.cardHolder && (
                  <div className="input-feedback">{errors.cardHolder}</div>
                )}

                <div className="d-flex justify-content-between">
                  <button className="btnRegister" style={disableStyle} type="submit" disabled={isSubmitting}>Submit</button>
                  <button className="btnRegister" type="button" onClick={handleLogin}>Sign In</button>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default SignUp;
