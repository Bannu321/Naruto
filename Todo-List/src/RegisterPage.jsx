import React from "react";
import "./index.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [viewPass, setViewPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);

  const handleToggle = () => {
    setViewPass(!viewPass);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !age) {
      alert("Please fill in all the fields");
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:8080/auth/register", {
        name: username,
        age: age,
        password: password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="LoginForm">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="formLogin">
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
        <div className="age">
          <input
            id="age"
            type="number"
            name="age"
            required
            placeholder="Age"
            value={age}
            onChange={(e) => {
              setAge(Number(e.target.value));
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
              setPassword(e.target.value);
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
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
