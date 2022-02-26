import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

function DetailedQuestionCard() {
  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    await axios
      .get(
        `https://stackoverflow-clone-be.herokuapp.com/question/all/single/${id}`
      )
      .then((response) => {
        setQuestion(response.data.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <div className="container question-page-main-container">
          <h1 className="sub-heading">Question :</h1>
          <div className="question-page-question-container">
            <div className="vote-btn-container">
              <button type="button" className="upvote-btn">
                &#9650;
              </button>
              <span className="vote-counter">{200}</span>
              <button type="button" className="downvote-btn">
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
          <h1 className="sub-heading">Answers :</h1>
          {question.answers == undefined ? (
            <></>
          ) : (
            question.answers.map((answer, i) => {
              return (
                <>
                  {/* <div key={i} className="question-page-question-container"> */}
                  <div className="answer-container">
                    <div className="answer-vote-btn-container">
                      <button type="button" className="upvote-btn">
                        &#9650;
                      </button>
                      <span className="vote-counter">{answer.votes}</span>
                      <button type="button" className="downvote-btn">
                        &#9660;
                      </button>
                    </div>

                    {/* </div> */}
                    <div className="container answer-body-container question-body-container">
                      <h1 className="question-page-question-title">
                        {answer.title}
                      </h1>
                      <p className="question-body-text">{answer.body}</p>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      )}
    </>
  );
}

export default DetailedQuestionCard;
