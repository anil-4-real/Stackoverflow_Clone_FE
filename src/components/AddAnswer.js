import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function AddAnswer() {
  const { user, isAuthenticated } = useAuth0();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { uid } = useParams();
  const addAnswer = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/question/answer/${uid}`,
        {
          title,
          body: description,
          uid: uuidv4(),
          postedby: user.nickname,
          likedby: [],
          dislikedby: [],
        }
      );
      if (res.data.statusCode === 201) {
        navigate(`/question/${uid}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="container ask-container">
        {isAuthenticated ? (
          <div className="form-group">
            <h1 className="ask-header sub-heading">Add answer</h1>
            <div className="ask-question-form">
              <label className="label" htmlFor="title">
                Answer Title
              </label>
              <p className="ask-subtitle">
                Be specific and answer as clean and accurately as possible (min
                20 characters, max 50)
              </p>
              <input
                id="title"
                className="input"
                type="text"
                placeholder="give a strong title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <label className="label" htmlFor="description">
                Answer Body
              </label>
              <p className="ask-subtitle">
                Explain the answer in detail (min 20 characters)
              </p>
              <textarea
                rows="20"
                id="description"
                className="input"
                placeholder="Explain your question in detail"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <button
                disabled={
                  title.length < 20 ||
                  title.length > 50 ||
                  description.length < 20
                    ? true
                    : false
                }
                onClick={() => {
                  if (isAuthenticated) {
                    addAnswer();
                  }
                }}
                className="btn2 ask-btn"
              >
                Post your answer
              </button>
            </div>
          </div>
        ) : (
          <p>please login to add an answer</p>
        )}
      </div>
    </div>
  );
}

export default AddAnswer;
