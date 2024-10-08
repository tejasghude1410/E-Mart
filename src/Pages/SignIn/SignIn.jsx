import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import './SignIn.css';
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="main">
      <div className="panel" id="login-form">
        <div className="panel-heading">
          <div className='bold'>Please</div> Sign In
        </div>
        <div className="panel-body">
          <p>If you're already a member, please login with your email and password.</p>
          <Formik
            initialValues={{ custEmail: "", custPassword: "" }}
            validationSchema={Yup.object().shape({
              custEmail: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
              custPassword: Yup.string()
                .required("No password provided.")
                .matches(/^[A-Za-z0-9]+$/, "Password must contain only numbers and letters")
                .min(5, "Password is too short - should be 5 chars minimum.")
                .max(10, "Password is too long - should be 10 characters maximum.")
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await fetch("http://localhost:8080/api/Customer/check", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(values)
                });

                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                localStorage.setItem("islogin", true);
                localStorage.setItem("custId", data); 
                
                navigate(`${localStorage.getItem("path")}`)
              } catch (err) {
                console.log(err);
                console.log(values);
                alert("Invalid credentials");
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  id="custEmail"
                  name="custEmail"
                  type="text"
                  placeholder="email"
                  value={values.custEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.custEmail && touched.custEmail && "error"}
                />
                {errors.custEmail && touched.custEmail && (
                  <div className="input-feedback">{errors.custEmail}</div>
                )}

                <div className="d-flex">
                  <input
                    id="custPassword"
                    name="custPassword"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    value={values.custPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.custPassword && touched.custPassword && "error"}
                  />
                  <button
                    style={{ fontSize: "20px" }}
                    id="togglepassview"
                    type="button"
                    className={passwordShown ? "bi bi-eye-slash" : "bi bi-eye"}
                    onClick={togglePassword}
                  ></button>
                </div>
                {errors.custPassword && touched.custPassword && (
                  <div className="input-feedback">{errors.custPassword}</div>
                )}

                <div className="loginfooter">
                  <button
                    className="btnlogin"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="globalbtnspin"></div>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                  <button
                    className="btnlogin"
                    disabled={isSubmitting}
                    onClick={() => navigate('/signin/SignUP')} 
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
