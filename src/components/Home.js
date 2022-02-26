import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

function Home() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    await axios
      .get("https://stackoverflow-clone-be.herokuapp.com/question/all")
      .then((response) => {
        setQuestions(response.data.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {loading ? (
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
          <div className="container main-content-container">
            {questions.map((question, i) => {
              return <QuestionCard key={i} data={question} />;
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Home;
