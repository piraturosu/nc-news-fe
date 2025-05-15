import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { deleteComment } from "../api";

function CommentCard({ body, votes, author, setComments, id }) {
  const { user } = useContext(LoggedInUserContext);

  function handleDeleteComment() {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    deleteComment(id)
      .then(() => {
        setComments((prevComments) => {
          return prevComments.filter((comment) => comment.comment_id !== id);
        });
        window.alert("Comment deleted!");
      })
      .catch(() => {
        window.alert("Comment could not be deleted. Please try again");
      });
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h3>{author}</h3>
        {user.username === author ? (
          <button className="text-red-500" onClick={handleDeleteComment}>
            delete comment
          </button>
        ) : (
          ""
        )}
      </div>
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
