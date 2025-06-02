import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../api";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import CommentCard from "./CommentCard";
import { patchArticleVote, postComment } from "../api";
import { useContext } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUser";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [localVotes, setLocalVotes] = useState(null);
  const [error, setError] = useState(null);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(LoggedInUserContext);
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

  function handleInputChange(event) {
    event.preventDefault();
    setNewComment(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    const newCommentObj = {
      author: user.username,
      body: newComment,
    };
    //optimistic UI rendering
    setComments((prevComments) => [newCommentObj, ...prevComments]);

    postComment(article_id, {
      username: user.username,
      body: newComment,
    })
      .then((apiComment) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.comment_id === newCommentObj.comment_id
              ? apiComment
              : comment,
          ),
        );
        event.target.reset();
        setNewComment("");
        setError(null);
      })
      .catch(() => {
        setError("Failed to post comment. Plese try again later");
      });
  }

  useEffect(() => {
    getArticleById(article_id).then(({ article: articleFromApi }) => {
      const article = articleFromApi;
      setArticle(article);
      setLocalVotes(article.votes);
      setIsArticleLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then(({ comments: commentsFromApi }) => {
      setComments(commentsFromApi);
      setIsCommentLoading(false);
    });
  }, [article_id]);

  if (isArticleLoading) {
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
    <div className="h-fit min-w-fit max-h-fit flex flex-col items-center">
      <div className="max-w-250 w-full min-w-fit p-4 border border-gray-300 rounded-lg shadow-md">
        <div className="flex flex-row self-start">
          <h2 className="text-l">{article.author}</h2>
          <p className="text-xs pl-2">{articleDate}</p>
        </div>
        <h1 className="text-3xl self-start font-bold p-2">{article.title}</h1>
        <div>
          <p>{article.body}</p>
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
              <p>{article.comment_count}</p>
            </div>
          </div>
        </div>
      </div>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="m-4 border border-gray-300 rounded-lg shadow-md"
      />
      <form
        className="max-w-250 min-w-fit w-full mt-4 p-4 border border-gray-300 rounded-lg shadow-md"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="new-comment">Add a comment</label>
        <textarea
          type="textarea"
          name="new-comment"
          className="w-full p-3 border border-gray-300 rounded-md"
          rows="3"
          onChange={handleInputChange}
        ></textarea>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className={`w-fit py-2 px-4 font-medium rounded-md ${
            user
              ? "bg-blue-500 text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } `}
          type="submit"
          disabled={!user}
        >
          <p>Submit</p>
        </button>
      </form>
      <div className="max-w-250 w-full min-w-fit mx-auto">
        {isCommentLoading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              id={comment.comment_id}
              body={comment.body}
              votes={comment.votes}
              author={comment.author}
              setComments={setComments}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ArticlePage;
