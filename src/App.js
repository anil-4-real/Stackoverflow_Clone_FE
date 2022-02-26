import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import DetailedQuestionCard from "./components/DetailedQuestionCard";
import Ask from "./components/Ask";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/ask-question" element={<Ask />} />
          <Route path="/question/:id" element={<DetailedQuestionCard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
