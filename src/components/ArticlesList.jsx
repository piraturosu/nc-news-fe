import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../Api";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(articlesFromApi);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>"Loading content..."</div>;
  }

  return (
    <div className="w-4xl">
      {articles.map((article) => (
        <ArticleCard
          author={article.author}
          title={article.title}
          body={article.body}
          topic={article.topic}
          votes={article.votes}
          key={article.article_id}
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
