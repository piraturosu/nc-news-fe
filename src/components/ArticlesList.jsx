import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";
import { useParams, useSearchParams } from "react-router-dom";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "";
  const order = searchParams.get("order") || "";

  useEffect(() => {
    getArticles(topic, sortBy, order).then((data) => {
      const articlesFromApi = data.articles;
      setArticles(articlesFromApi);
      setIsLoading(false);
    });
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
    return <div>"Loading content..."</div>;
  }

  return (
    <div className="w-4xl flex flex-col items-center">
      <div className="flex flex-row space-y-2">
        <div className="">
          <label className="text-sm">Sort articles</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Order By</label>
          <select
            value={order}
            onChange={handleOrderChange}
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          author={article.author}
          title={article.title}
          body={article.body}
          topic={article.topic}
          votes={article.votes}
          article_img={article.article_img_url}
          comment_count={article.comment_count}
          created_at={article.created_at}
          article_id={article.article_id}
        />
      ))}
    </div>
  );
}

export default ArticlesList;
