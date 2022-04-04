import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Ask() {
  const { user, isAuthenticated } = useAuth0();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const askQuestion = async () => {
    try {
      const res = await axios.post("http://localhost:3001/question/new", {
        title,
        body: description,
        tags,
        views: 0,
        uid: uuidv4(),
        votes: 0,
        answers: [],
        questions: [],
        likedby: [],
        dislikedby: [],
        postedby: user.nickname,
        sub: user.sub,
      });

      console.log(res);
      if (res.data.statusCode === 201) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeTag = (tag) => {
    const filtered = tags.filter((each) => each !== tag);
    setTags(filtered);
  };
  return (
    <div className="container ask-container">
      {isAuthenticated ? (
        <div className="form-group">
          <h1 className="ask-header sub-heading">Ask a question</h1>
          <div className="ask-question-form">
            <label className="label" htmlFor="title">
              Title
            </label>
            <p className="ask-subtitle">
              Be specific and imagine you’re asking a question to another person
              (min 20 characters , max 50)
            </p>
            <input
              id="title"
              className="input"
              type="text"
              placeholder="what is foo bar?"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <label className="label" htmlFor="description">
              Body
            </label>
            <p className="ask-subtitle">
              Include all the information someone would need to answer your
              question (min 20 characters)
            </p>
            <textarea
              rows="20"
              id="description"
              className="input"
              placeholder="Explain your question in detail"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label className="label" htmlFor="tags">
              Tags
            </label>
            <p className="ask-subtitle">
              Add up to 5 tags to describe what your question is about, press
              enter or space to add (min 1 tag)
            </p>
            <div className="tagbox-container">
              {tags.length > 0 &&
                tags.map((tag, i) => {
                  return (
                    <div className="tagbox" key={i}>
                      <span className="tag">
                        {tag}&nbsp;
                        <button onClick={() => removeTag(tag)} type="button">
                          &#10006;
                        </button>
                      </span>
                    </div>
                  );
                })}
            </div>
            <input
              id="tags"
              className="input"
              type="text"
              disabled={tags.length === 5 ? true : false}
              placeholder="javascript"
              onKeyUp={(e) => {
                if (tags.length < 5) {
                  if (e.key === "Enter" || e.key === " ") {
                    if (!tags.includes(e.target.value.trim())) {
                      setTags(() => [...tags, e.target.value.trim()]);
                      setTimeout(() => {
                        e.target.value = "";
                      }, 0);
                    }
                  }
                }
              }}
            ></input>
            <button
              // disabled={
              //   title.length < 20 ||
              //   title.length > 50 ||
              //   description.length < 20 ||
              //   tags.length === 0
              //     ? true
              //     : false
              // }
              onClick={() => {
                if (isAuthenticated) {
                  askQuestion();
                }
              }}
              className="btn2 ask-btn"
            >
              Ask your question?
            </button>
          </div>
        </div>
      ) : (
        <p>please login to ask a question</p>
      )}
    </div>
  );
}

export default Ask;
