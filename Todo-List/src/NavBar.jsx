import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <ul>
        <li><i className="fa-solid fa-leaf fa-2x" style={{ color: "#f39c12" }}></i></li>
        <li>Home</li>
        <li>About us</li>
        <li>Contact us</li>
        <li>
          <button className="butt1" onClick={() => navigate("/login")}>
            Get started
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;