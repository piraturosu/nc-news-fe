import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../api";
import { useParams } from "react-router-dom";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic).then((data) => {
      const articlesFromApi = data.articles;
      setArticles(articlesFromApi);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) {
    return <div>"Loading content..."</div>;
  }

  return (
    <div className="w-4xl">
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
