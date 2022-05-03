import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useAuth0 } from "@auth0/auth0-react";

function DetailedQuestionCard() {
  const { user, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/question/all/single/${id}`)
      .then((response) => {
        setQuestion(response.data.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  };

  const handleUpVoteButtonClick = async (value) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/question/update/likes/${id}`,
        { value, sub: user.sub }
      );
      if (res.data.statusCode === 201) {
        getQuestion();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownVoteButtonClick = async (value) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/question/update/dislikes/${id}`,
        { value, sub: user.sub }
      );
      if (res.data.statusCode === 201) {
        getQuestion();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAnswerUpvote = async (value, uid) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/question/answer/update/likes/${question.uid}/${uid}`,
        { value, sub: user.sub }
      );
      if (res.data.statusCode === 201) {
        getQuestion();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAnswerDownvote = async (value, uid) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/question/answer/update/dislikes/${question.uid}/${uid}`,
        { value, sub: user.sub }
      );
      if (res.data.statusCode === 201) {
        getQuestion();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <div
          className="container question-page-main-container"
          style={{ minHeight: "100vh" }}
        >
          <div className="question-card-header">
            <h1 className="sub-heading">Question : </h1>
            <button
              className="ask-btn"
              onClick={() => {
                navigate(`/add-answer/${question.uid}`);
              }}
            >
              Add answer
            </button>
          </div>
          <div className="question-page-question-container">
            <div className="vote-btn-container">
              <button
                style={
                  isAuthenticated && question.likedby.includes(user.sub)
                    ? { color: "rgba(255, 136, 0, 0.712)" }
                    : { color: "silver" }
                }
                onClick={() => {
                  if (isAuthenticated) {
                    if (question.likedby.includes(user.sub)) {
                      handleUpVoteButtonClick(0);
                      getQuestion();
                    } else if (!question.likedby.includes(user.sub)) {
                      handleUpVoteButtonClick(1);
                      getQuestion();
                    }
                  } else {
                    window.alert("please login to vote");
                  }
                }}
                type="button"
                className="upvote-btn"
              >
                &#9650;
              </button>
              <span className="vote-counter">
                {question.likedby.length >= 0 &&
                question.dislikedby.length >= 0 ? (
                  question.likedby.length - question.dislikedby.length
                ) : (
                  <></>
                )}
              </span>
              <button
                style={
                  isAuthenticated && question.dislikedby.includes(user.sub)
                    ? { color: "rgba(255, 136, 0, 0.712)" }
                    : { color: "silver" }
                }
                onClick={() => {
                  if (isAuthenticated) {
                    if (question.dislikedby.includes(user.sub)) {
                      handleDownVoteButtonClick(0);
                      getQuestion();
                    } else if (!question.dislikedby.includes(user.sub)) {
                      handleDownVoteButtonClick(1);
                      getQuestion();
                    }
                  } else {
                    window.alert("please login to vote");
                  }
                }}
                type="button"
                className="downvote-btn"
              >
                &#9660;
              </button>
            </div>
            <div>
              <h1 className="question-page-question-title">{question.title}</h1>
              <span className="misc-info">
                Viewed&nbsp;{question.views}&nbsp;times
              </span>
              &nbsp;
              {question.answers == undefined ? (
                <span className="misc-info">0&nbsp;answers</span>
              ) : (
                <span className="misc-info">
                  {question.answers.length}&nbsp;answers
                </span>
              )}
              <div className="tag-container">
                {question.tags == undefined ? (
                  <></>
                ) : (
                  question.tags.map((tag, i) => {
                    return (
                      <span className="tag q-tag" key={i}>
                        {tag}
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="container question-body-container">
            <p className="question-body-text">{question.body}</p>
          </div>
          <hr></hr>
          <h1 className="sub-heading">Answers</h1>
          {question.answers == undefined ? (
            <></>
          ) : question.answers.length === 0 ? (
            <p className="misc-info"> this question has no answers yet</p>
          ) : (
            question.answers.map((answer, i) => {
              return (
                <div key={i}>
                  <div className="answer-container">
                    <div className="answer-vote-btn-container">
                      <button
                        style={
                          isAuthenticated && answer.likedby.includes(user.sub)
                            ? { color: "rgba(255, 136, 0, 0.712)" }
                            : { color: "silver" }
                        }
                        onClick={() => {
                          if (isAuthenticated) {
                            if (answer.likedby.includes(user.sub)) {
                              handleAnswerUpvote(0, answer.uid);
                              getQuestion();
                            } else if (!answer.likedby.includes(user.sub)) {
                              handleAnswerUpvote(1, answer.uid);
                              getQuestion();
                            }
                          } else {
                            window.alert("please login to vote");
                          }
                        }}
                        type="button"
                        className="upvote-btn"
                      >
                        &#9650;
                      </button>
                      <span className="vote-counter">
                        {answer.likedby.length >= 0 &&
                        answer.dislikedby.length >= 0 ? (
                          answer.likedby.length - answer.dislikedby.length
                        ) : (
                          <></>
                        )}
                      </span>
                      <button
                        style={
                          isAuthenticated &&
                          answer.dislikedby.includes(user.sub)
                            ? { color: "rgba(255, 136, 0, 0.712)" }
                            : { color: "silver" }
                        }
                        onClick={() => {
                          if (isAuthenticated) {
                            if (answer.dislikedby.includes(user.sub)) {
                              handleAnswerDownvote(0, answer.uid);
                              getQuestion();
                            } else if (!answer.dislikedby.includes(user.sub)) {
                              handleAnswerDownvote(1, answer.uid);
                              getQuestion();
                            }
                          } else {
                            window.alert("please login to vote");
                          }
                        }}
                        type="button"
                        className="downvote-btn"
                      >
                        &#9660;
                      </button>
                    </div>
                    <div className="answer-body-container">
                      <div className="answer-card-header">
                        <h1 className="question-page-question-title">
                          {answer.title}
                        </h1>
                        <span className="misc-text">
                          answer by {answer.postedby}
                        </span>
                      </div>

                      <p className="question-body-text">{answer.body}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
}

export default DetailedQuestionCard;
