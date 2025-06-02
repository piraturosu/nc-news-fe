import TopicsList from "./TopicsList";
import ArticlesList from "./ArticlesList";
import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { getArticles } from "../api";
import { useParams, useSearchParams } from "react-router-dom";

function Home() {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getTopics(), getArticles(topic, sortBy, order)]).then(
      ([topicsFromApi, articlesData]) => {
        setTopics(topicsFromApi);
        setArticles(articlesData.articles);
        setIsLoading(false);
      },
    );
  }, [topic, sortBy, order]);

  function handleSortChange(e) {
    searchParams.set("sort_by", e.target.value);
    setSearchParams(searchParams);
  }

  function handleOrderChange(e) {
    searchParams.set("order", e.target.value);
    setSearchParams(searchParams);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen w-full">
        Loading content...
      </div>
    );
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
      />
    </div>
  );
}

export default Home;
