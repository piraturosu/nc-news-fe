import "./App.css";
import ArticlePage from "./components/ArticlePage";
import Header from "./components/Header";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import LoginPage from "./components/LoginPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:topic" element={<Home />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users/:user_id" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
