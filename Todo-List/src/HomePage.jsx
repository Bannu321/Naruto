import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Typewriter from "typewriter-effect";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div>
        <div className="hero">
          <h1>
            <Typewriter
              options={{
                strings: ["Welcome", "To where your tasks are truly aligned!"],
                autoStart: true,
                loop: true,
                cursor: "|",
              }}
            />
          </h1>
          <button
            className="GetStarted butt1"
            onClick={() => {
              navigate("/login");
            }}
          >
            Get started
          </button>
        </div>

        <div className="whyus">
          <h2>Why chosing us makes a difference</h2>
          <ul>
            <li>point 1</li>
            <li>point 2</li>
            <li>point 3</li>
            <li>point 4</li>
            <li>point 5</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
