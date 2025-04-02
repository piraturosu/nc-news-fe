import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
function CommentCard({ body, votes, author }) {
  return (
    <div className="mt-4">
      <h3>{author}</h3>
      <p>{body}</p>
      <div className="flex mt-2">
        <div className="bg-slate-200 rounded-full w-12 h-6 flex items-center justify-around ml-4">
          <ArrowUpIcon className="size-3" />
          <p className="text-xs">{votes}</p>
          <ArrowDownIcon className="size-3" />
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
