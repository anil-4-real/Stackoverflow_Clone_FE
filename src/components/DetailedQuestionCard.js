import React from "react";
import { useParams } from "react-router-dom";

function DetailedQuestionCard() {
  const { id } = useParams();
  return <div className="container">individual question details page</div>;
}

export default DetailedQuestionCard;
