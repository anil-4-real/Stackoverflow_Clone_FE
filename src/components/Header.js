import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";

function Header() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      createUser();
    }
  }, [user]);

  const createUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/new`,
        {
          email: user.email,
          name: user.nickname,
          sub: user.sub,
          questions: [],
          answers: [],
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header className="header">
      <div className="navbar container">
        <Link className="link" to="/">
          <img
            className="logo-img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/1200px-Stack_Overflow_icon.svg.png"
            alt="stackoverflow"
          ></img>
          <p className="logo-text">
            stack&nbsp;<span className="overflow">overflow</span>
          </p>
        </Link>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png"
            alt="search"
          ></img>
          <input className="search-box" type="text" placeholder="Search..." />
        </div>
        <div className="profile">
          {isAuthenticated && (
            <Link className="link" to="/profile">
              <img
                className="profile-icon"
                src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
              ></img>
            </Link>
          )}
        </div>
        {isAuthenticated && <LogoutButton />}
        {!isAuthenticated && <LoginButton />}
      </div>
    </header>
  );
}

export default Header;
