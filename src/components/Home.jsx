import React from "react";
import TopicsList from "./TopicsList";
import ArticlesList from "./ArticlesList";

function Home() {
  return (
    <div className="flex justify-around w-full">
      <TopicsList />
      <ArticlesList />
    </div>
  );
}

export default Home;
