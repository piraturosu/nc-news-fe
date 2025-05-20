import React from "react";
import { Link } from "react-router-dom";

function TopicCard({ slug, description, setSelectedTopic }) {
  function handleSetSelectedTopic() {
    setSelectedTopic(slug);
  }

  return (
    <div className="flex flex-col bg-slate-100 rounded-4xl w-25 h-25 text-xs m-4 p-4 sm:w-40 sm:h-40 sm:flex-col sm:text-xl items-center justify-center sm:bg-white sm:hover:bg-slate-100 sm:hover:shadow-md">
      <Link to={`/${slug}`} onClick={handleSetSelectedTopic}>
        <h3 className="text-lg sm:text-2xl">{slug}</h3>
      </Link>
      <p className="hidden sm:block sm:text-base ml-2 sm:ml-0">{description}</p>
    </div>
  );
}

export default TopicCard;
