import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="topbar">
      <ul>
        <li><i className="fa-solid fa-shuriken fa-2x" style={{ color: "#f39c12" }}></i></li>
        <li><button className="butt2" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  );
};

export default TopBar;