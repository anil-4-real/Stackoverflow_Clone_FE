import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="navbar container">
        <Link className="link" to="/">
          <img
            className="logo-img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/1200px-Stack_Overflow_icon.svg.png"
            alt=""
          ></img>
          <p className="logo-text">
            stack&nbsp;<span className="overflow">overflow</span>
          </p>
        </Link>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png"
            alt=""
          ></img>
          <input className="search-box" type="text" placeholder="Search..." />
        </div>
        <div className="profile">
          <Link className="link" to="/profile">
            <img
              className="profile-icon"
              src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            ></img>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
