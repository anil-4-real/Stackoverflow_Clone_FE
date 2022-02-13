import React from "react";

function Ask() {
  return (
    <div className="container ask-container">
      <div className="form-group">
        <h1 className="ask-header sub-heading">Ask a question</h1>
        <div className="ask-question-form">
          <label className="label" for="title">
            Title
          </label>
          <p className="ask-subtitle">
            Be specific and imagine you’re asking a question to another person
          </p>
          <input
            id="title"
            className="input"
            type="text"
            placeholder="what is foo bar?"
          ></input>
          <label className="label" for="description">
            Body
          </label>
          <p className="ask-subtitle">
            Include all the information someone would need to answer your
            question
          </p>
          <textarea
            rows="20"
            id="description"
            className="input"
            placeholder="Explain your question in detail"
          ></textarea>
          <label className="label" for="tags">
            Tags
          </label>
          <p className="ask-subtitle">
            Add up to 5 tags to describe what your question is about
          </p>
          <input
            id="tags"
            className="input"
            type="text"
            placeholder="javascript, react"
          ></input>
          <button className="btn2 ask-btn">Ask your question?</button>
        </div>
      </div>
    </div>
  );
}

export default Ask;
