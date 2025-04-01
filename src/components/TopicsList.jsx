import React from "react";
import TopicCard from "./TopicCard";

function TopicsList() {
  return (
    <div className="w-60 flex flex-col h-full items-center border-amber-700">
      <TopicCard />
      <TopicCard />
      <TopicCard />
    </div>
  );
}

export default TopicsList;
