import { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { patchArticleVote } from "../api";

function ArticleCard({ title, body, topic, comment_count, votes, article_id }) {
  const [localVotes, setLocalVotes] = useState(votes);

  function handleIncrementVote() {
    setLocalVotes((prevVotes) => prevVotes + 1);
    patchArticleVote(article_id, { inc_votes: 1 }).catch(() => {
      setLocalVotes((prevVotes) => prevVotes - 1);
    });
  }

  function handleDecrementVote() {
    setLocalVotes((prevVotes) => prevVotes - 1);
    patchArticleVote(article_id, { inc_votes: -1 }).catch(() => {
      setLocalVotes((prevVotes) => prevVotes + 1);
    });
  }

  return (
    <div className="min-h-50 min-w-full m-4 p-4  border-gray-300 rounded-lg shadow-sm hover:bg-slate-100 hover:shadow-md flex flex-col justify-evenly">
      <div className="flex">
        <Link to={`/articles/${article_id}`}>
          <h3 className="text-2xl">{title}</h3>
        </Link>
        <p className="text-xs pl-4">{topic}</p>
      </div>
      <p>
        {body.length > 300 ? body.slice(0, 300).trim().concat("...") : body}
      </p>
      <div className="flex mt-2">
        <div className="bg-slate-200 rounded-full w-15 h-8 flex items-center justify-around ml-4">
          <ArrowUpIcon
            className="size-4 cursor-pointer hover:text-blue-500"
            onClick={handleIncrementVote}
          />
          <p>{localVotes}</p>
          <ArrowDownIcon
            className="size-4 cursor-pointer hover:text-blue-500"
            onClick={handleDecrementVote}
          />
        </div>
        <div className="bg-slate-200 rounded-full w-15 h-8 flex items-center justify-around ml-4">
          <ChatBubbleOvalLeftIcon className="size-4" />
          <p>{comment_count}</p>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
