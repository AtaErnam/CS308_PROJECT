import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [taxID, setTaxID] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      setError("Name should be at least 3 characters.");
    } else if (!email.includes("@") || !email.includes(".")) {
      setError("Email should be in email format.");
    } else if (taxID.length < 11) {
      setError("Tax ID should be at least 11 digit characters.");
    } else if (homeAddress.length < 1) {
      setError("Home address should be at least 1 character.");
    } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
      setError(
        "Password should include at least 3 digits and 3 string characters."
      );
    } else if (password !== passwordConfirm) {
      setError("Passwords do not match.");
    } else {
      // Store user data in database here
      console.log("User data stored successfully!");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Tax ID:
          <input
            type="text"
            value={taxID}
            onChange={(e) => setTaxID(e.target.value)}
          />
        </label>
        <label>
          Home Address:
          <input
            type="text"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>
        {error && <div className="error-message">{error}</div>}

        <button type="submit">Create Account</button>
      </form>
      <br/>
      
      <br/>
      

      <Link to="/login">
        <button type="submit">Go to Login Page</button>
      </Link>
    </div>
  );
}

export default SignupPage;
