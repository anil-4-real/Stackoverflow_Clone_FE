import React from "react";
import { Link } from "react-router-dom";

function QuestionCard(props) {
  return (
    <>
      <div className="question-container">
        <div className="misc-info">
          <p className="misc-text">
            <span>0&nbsp;</span>votes
          </p>
          <p className="misc-text">
            <span>0&nbsp;</span>answers
          </p>
          <p className="misc-text">
            <span>0&nbsp;</span>views
          </p>
        </div>
        <div className="question-content">
          <Link className="question-title-link" to="/question/:id">
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
            posted by <span>Anil</span>
          </p>
        </div>
      </div>
      <hr />
    </>
  );
}

export default QuestionCard;
