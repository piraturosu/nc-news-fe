import React from "react";
import TopicsList from "./TopicsList";
import ArticlesList from "./ArticlesList";
import { useEffect, useState } from "react";
import { getTopics } from "../api";

function Home() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  return (
    <div className="flex justify-around w-full">
      <TopicsList
        topics={topics}
      />
      <ArticlesList />
    </div>
  );
}

export default Home;
