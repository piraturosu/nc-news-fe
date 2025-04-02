import "./App.css";
import ArticlePage from "./components/ArticlePage";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import TopicsList from "./components/TopicsList";
import { Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <section className="flex justify-around">
              <TopicsList />
              <ArticlesList />
            </section>
          }
        />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
