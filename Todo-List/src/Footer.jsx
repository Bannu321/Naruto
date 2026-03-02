import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="actfoot">
          <div className="abt">
            <h2>About this project</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem sequi earum accusamus, quod recusandae harum ullam
              quia architecto similique maiores molestiae! Sint?
            </p>
          </div>
          <div className="cont">
            <h2>Contact us</h2>
            <ul>
              <li>email: todo@list.com</li>
              <li>phone: 123-456-7890</li>
              <li>address: 123 Main Street, City, State 12345</li>
            </ul>
          </div>
        </div>
        <h3 className="cprt">© 2024 Todo List. All rights reserved.</h3>
      </div>
    </div>
  );
};

export default Footer;
