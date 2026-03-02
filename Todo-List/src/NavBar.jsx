import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <i
              className="fa-slab-press fa-regular fa-alarm-clock fa-2x"
              style={{ textShadow: "none" }}
            ></i>
          </li>
          <li>Home</li>
          <li>About us</li>
          <li>contact us</li>
          <li>
            <button
              className="GetStarted butt1"
              onClick={() => {
                navigate("/login");
              }}
            >
              Get started
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
