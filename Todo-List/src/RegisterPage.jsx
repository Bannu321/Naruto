import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [viewPass, setViewPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const handleToggle = () => setViewPass(!viewPass);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || !age) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await axios.post("http://localhost:8080/auth/register", {
        name: username,
        age: Number(age),
        password,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="LoginForm">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="formLogin">
        <div className="name">
          <input
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="age">
          <input
            type="number"
            required
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="pass">
          <input
            type={viewPass ? "text" : "password"}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleToggle} className="viewPass">
            <i className={`fa-solid fa-eye${viewPass ? "-slash" : ""}`}></i>
          </button>
        </div>
        <button type="submit" className="butt1">
          Register
        </button>
        <button
          type="button"
          className="butt1"
          onClick={() => navigate("/login")}
        >
          Have an account? Login
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
