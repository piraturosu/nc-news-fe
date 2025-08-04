import TopicsList from "./TopicsList";
import ArticlesList from "./ArticlesList";
import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { getArticles } from "../api";
import { useParams, useSearchParams } from "react-router-dom";
import RouteNotFound from "./RouteNotFound";

function Home() {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    Promise.all([getTopics(), getArticles(topic, sortBy, order, page)])
      .then(([topicsFromApi, articlesData]) => {
        setTopics(topicsFromApi);
        setArticles(articlesData.articles);
        setTotalArticles(articlesData.totalArticles || 0);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [topic, sortBy, order, page]);

  function handleSortChange(e) {
    searchParams.set("sort_by", e.target.value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  function handleOrderChange(e) {
    searchParams.set("order", e.target.value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  function handlePageChange(newPage) {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen w-full">
        Loading content...
      </div>
    );
  }

  if (error && error.response.status === 404) {
    return <RouteNotFound type="topic" />;
  }

  return (
    <div className="flex flex-col justify-center w-auto sm:flex-row sm:w-full min-h-screen">
      <TopicsList topics={topics} />
      <ArticlesList
        articles={articles}
        handleSortChange={handleSortChange}
        handleOrderChange={handleOrderChange}
        sortBy={sortBy}
        order={order}
        page={page}
        totalArticles={totalArticles}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
