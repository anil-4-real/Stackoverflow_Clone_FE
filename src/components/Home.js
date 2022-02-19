import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  console.log(questions);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    await axios
      .get("http://localhost:3000/question/all")
      .then((response) => {
        setQuestions(response.data.allData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="banner-container container">
      <div className="banner">
        <h1 className="sub-heading">Top Questions</h1>
        <button
          type="button"
          className="ask-btn"
          onClick={() => navigate("/ask-question")}
        >
          Ask Question
        </button>
      </div>
      {/* <hr></hr> */}
      <div className="container main-content-container">
        {questions.map((question, i) => {
          return <QuestionCard key={i} data={question} />;
        })}
      </div>
    </div>
  );
}

export default Home;
