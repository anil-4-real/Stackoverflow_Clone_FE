import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      getUserQuestions();
    }
  }, [isAuthenticated]);

  const getUserQuestions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${user.sub}`
      );
      if (res.data.statusCode === 200) {
        setQuestions(res.data.user);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="profile-container container" style={{ minHeight: "100vh" }}>
      <div className="profile-wrapper">
        {isAuthenticated && (
          <>
            <img
              className="profile-picture"
              src={user.picture}
              alt={user.name}
            />
            <p className="profile-name">
              <span>username : </span>
              {user.nickname}
            </p>
            <p className="profile-name">
              <span>email : </span>
              {user.email}
            </p>
          </>
        )}
      </div>

      <div className="container profile-questions-container">
        <h3 className="sub-heading">Your questions</h3>
        {questions.questions === undefined ? (
          <></>
        ) : questions.questions.length === 0 ? (
          <p className="misc-info"> you have not asked any questions</p>
        ) : (
          questions.questions.map((question, i) => {
            return (
              <p
                key={i}
                className="question-link"
                onClick={() => {
                  navigate(`/question/${question.uid}`);
                }}
              >
                {i + 1} : {question.title}
              </p>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Profile;
