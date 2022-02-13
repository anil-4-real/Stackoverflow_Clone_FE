import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import DetailedQuestionCard from "./components/DetailedQuestionCard";
import Question from "./components/Question";
import Ask from "./components/Ask";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/ask-question" element={<Ask />} />
          <Route path="/ask" element={<Question />} />
          <Route path="/question/:id" element={<DetailedQuestionCard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
