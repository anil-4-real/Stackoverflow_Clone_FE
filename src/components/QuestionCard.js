import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function QuestionCard(props) {
  const incrementViews = async () => {
    await axios
      .put(`http://localhost:3001/question/all/${props.data.uid}`, {
        views: props.data.views + 1,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="question-container">
        <div className="misc-info">
          <p className="misc-text">
            {props.data.votes ? (
              <span>{props.data.votes}&nbsp;</span>
            ) : (
              <span>0&nbsp;</span>
            )}
            votes
          </p>
          <p className="misc-text">
            <span>{props.data.answers.length}&nbsp;</span>answers
          </p>
          <p className="misc-text">
            {props.data.views ? (
              <span>{props.data.views}&nbsp;</span>
            ) : (
              <span>0&nbsp;</span>
            )}
            views
          </p>
        </div>
        <div className="question-content">
          <Link
            className="question-title-link"
            to={`/question/${props.data.uid}`}
            onClick={incrementViews}
          >
            <h2 className="question-title">{props.data.title}</h2>
          </Link>
          <div className="tag-container">
            {props.data.tags.map((tag, i) => {
              return (
                <span className="tag" key={i}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className="misc-meta">
          <p className="misc-meta-posted-by">
            posted by <span>{props.data.postedby}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
