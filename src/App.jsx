import "./App.css";
import ArticlePage from "./components/ArticlePage";
import Header from "./components/Header";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import LoginPage from "./components/LoginPage";
import CreateArticle from "./components/CreateArticle";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col bg-white">
      <Header />
      <main className="p-4 sm:p-6 md:p-6 max-w-5xl w-full mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:topic" element={<Home />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users/:user_id" element={<UserPage />} />
          <Route path="/create-article" element={<CreateArticle />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
