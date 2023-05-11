import React, { useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [loginError, setLoginError] = useState(false);

  // Dummy users for authentication
  const dummyUsers = [
    {
      email: "alp@test.com",
      password: "alp123",
    },
    {
      email: "ata@test.com",
      password: "ata123",
    },
    {
      email: "helin@test.com",
      password: "helin123",
    },
  ];

  const submitForm = (values) => {
    const user = dummyUsers.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      setLoginError(false);
      alert("Logged In"); // Display a pop-up message when logged in
    } else {
      setLoginError(true);
    }
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password too short";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <div className="container">
            <h1>Sign in to continue</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                {errors.email && touched.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                {errors.password && touched.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>

              {loginError && (
                <p className="error">User Not Found</p>
              )}
            </form>
            <br></br>
            <Link to="/">
              <button>Go to Main Page</button>
            </Link>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
            <Link to="/signup">
              <button>Create Account</button>
            </Link>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginPage;