import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailedQuestionCard() {
  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  // console.log(question.tags.length);

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    await axios
      .get(`http://localhost:3000/question/all/single/${id}`)
      .then((response) => {
        // console.log(response.data.questionData);
        setQuestion(response.data.questionData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container question-page-main-container">
      <div className="question-page-question-container">
        <h1 className="question-page-question-title">{question.title}</h1>
        <span className="misc-info">
          Viewed&nbsp;{question.views}&nbsp;times
        </span>
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
        <p className="question-body-text">
          <code>{question.body}</code>
        </p>
      </div>
    </div>
  );
}

export default DetailedQuestionCard;
