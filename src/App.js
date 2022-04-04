import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import DetailedQuestionCard from "./components/DetailedQuestionCard";
import Ask from "./components/Ask";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import AddAnswer from "./components/AddAnswer";
import Footer from "./components/Footer";

function App() {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      <Auth0Provider
        domain={process.env.REACT_APP_DOMAIN_ID}
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <Router>
          <Header />
          <Routes>
            <Route path="/ask-question" element={<Ask />} />
            <Route path="/question/:id" element={<DetailedQuestionCard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-answer/:uid" element={<AddAnswer />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </Auth0Provider>
    </>
  );
}

export default App;
