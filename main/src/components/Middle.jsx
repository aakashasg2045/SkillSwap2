import React, { useState } from "react";
import "../Middle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export const Middle = () => {
  const [login, setLogin] = useState(true);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:3000";

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = login ? "/api/user/login" : "/api/user/register";
    try {
      const res = await axios.post(url + newUrl, data);
      if (res.data.success) {
        if (login) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data)); // Save user info
          navigate("/");
        } else {
          setShowSuccess(true);
        }
      } else {
        setError(res.data.message);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (err) {
      setError("Server error. Try again later.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleToggle = () => {
    setLogin(!login);
    setData({ name: "", email: "", password: "" });
  };

  return (
    <>
      {showError && (
        <div className="error-popup">
          <div className="error-content">
            <div className="error-symbol">❌</div>
            <p>{error}</p>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="success-popup">
          <div className="checkmark-container">
            <div className="checkmark">✓</div>
            <p>Successfully Signed Up!</p>
            <button className="home-btn" onClick={() => navigate("/")}>
              Go to Home
            </button>
          </div>
        </div>
      )}
      <Header />
      <div className={`login-outer ${login ? "slide-left" : "slide-right"}`}>
        <div className="login-inner">
          <div>
            <h1 className="headinglogologin">{login ? "Login" : "Register"}</h1>
            <br />
            {!login && (
              <>
                <p>Name:</p>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
                <br />
                <br />
              </>
            )}
            <p className="redpppp">Email:</p>
            <input
            className="redpppp"
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
            <br />
            <br />
            <p className="redpppp">Password:</p>
            <input
              className="redpppp"
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
            <br />
            <br />
            <button onClick={onLogin}>{login ? "Login" : "Register"}</button>
            <br />
            <br />
            <p className="re" onClick={handleToggle}>
              {login ? "Not registered yet? " : "Already registered? "}
              <span>{login ? "Sign up" : "Log in"}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
