import React from "react";
import { Link } from "react-router-dom";

function TopicCard({ slug, description, setSelectedTopic }) {
  function handleSetSelectedTopic() {
    setSelectedTopic(slug);
  }

  return (
    <div className="max-w-40 w-40 h-40 flex flex-col items-center justify-center hover:bg-slate-100 hover:shadow-md">
      <Link to={`/${slug}`} onClick={handleSetSelectedTopic}>
        <h3 className="text-2xl">{slug}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
}

export default TopicCard;
