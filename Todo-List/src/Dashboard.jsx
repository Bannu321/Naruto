import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import Footer from "./Footer";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const locat = useLocation();
  useEffect(() => {
    const FetchUser = async () => {
      try {
        const usr = JSON.parse(localStorage.getItem("user"));
      } catch (err) {
        console.log(err);
      }
    };
    FetchUser();
  }, []);

  const usr = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <TopBar />
      <h1>
        Welcome {usr?.name} you are {usr?.age} old
      </h1>
      <h2>We are pleased to have you on our website thanks for joining us!</h2>
      <h2>
        You are Level: {usr.level} and XP: {usr.xp}{" "}
      </h2>
      <Footer />
    </div>
  );
};

export default Dashboard;
