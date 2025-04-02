import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../Api";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then(({ article: articleFromApi }) => {
      const article = articleFromApi;
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  const date = new Date(`${article.created_at}`);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const articleDate = formatter.format(date);

  return (
    <div className="h-fit max-w-250 max-h-fit">
      <div className="flex">
        <h2 className="text-2xl">{article.author}</h2>
        <p className="text-xs pl-4">{articleDate}</p>
      </div>
      <div>
        <p>{article.body}</p>
      </div>
      <div className="flex mt-2">
        <div className="bg-slate-200 rounded-full w-15 h-8 flex items-center justify-around ml-4">
          <ArrowUpIcon className="size-4" />
          <p>{article.votes}</p>
          <ArrowDownIcon className="size-4" />
        </div>
        <div className="bg-slate-200 rounded-full w-15 h-8 flex items-center justify-around ml-4">
          <ChatBubbleOvalLeftIcon className="size-4" />
          <p>{article.comment_count}</p>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
