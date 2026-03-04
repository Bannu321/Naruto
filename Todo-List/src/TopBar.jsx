import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(
        "An error occurred and the logout was failed. Please try again later.",
      );
    }
  };
  return (
    <div>
      <div className="topbar">
        <ul>
          <li>
            {/* <i
              className="fa-slab-press fa-regular fa-alarm-clock fa-2x"
              style={{ textShadow: "none" }}
            ></i> */}
          </li>
          {/* <li><button>Logout</button></li> */}
          {/* <li>About us</li> */}
          {/* <li>contact us</li> */}
          <li>
            <button className="Logout butt2" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
