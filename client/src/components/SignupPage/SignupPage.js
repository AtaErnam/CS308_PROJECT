import React from "react";
import { Formik } from "formik";


const SignupPage = () => {
    const initialValues = {
        email: "",
        password: "",
    };

    const submitForm = async (values) => {
        try {
            const response = await fetch("http://127.0.0.1:8080/api/v1/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (data.error) {
                // setError(data.error);
            } else {
                // continue to dashboard
            }
        } catch (error) {
            // setError("User not found.");
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
                        <h1>Sign up to continue</h1>
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
                                Sign Up
                            </button>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default SignupPage;