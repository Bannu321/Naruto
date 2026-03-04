import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [viewPass, setViewPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem("user")) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  });

  const handleToggle = () => {
    setViewPass(!viewPass);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login", {
        name: username,
        password: password,
      });
      console.log(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard", {
        state: { user: res.data },
      });
    } catch (err) {
      console.log(err + "Invalid Credentials");
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="LoginForm">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="formLogin">
        <div className="name">
          <input
            id="username"
            type="text"
            name="username"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="pass">
          <input
            id="password"
            type={viewPass ? "text" : "password"}
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button onClick={handleToggle} type="button" className="viewPass">
            <i
              className={viewPass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
              id="togI"
            ></i>
          </button>
        </div>
        <button type="submit" className="butt1">
          Login
        </button>
        <button
          type="button"
          className="butt1"
          onClick={() => {
            navigate("/register");
          }}
        >
          Not Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
