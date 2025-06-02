import ArticleCard from "./ArticleCard";


function ArticlesList({ articles, handleSortChange, handleOrderChange, sortBy, order }) {
  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-row sm:flex-row space-y-2 space-x-4 sm:space-y-0 sm:space-x-4 mb-4 w-full">
        <div className="w-full flex flex-col items-center sm:w-auto sm:items-center sm:justify-center">
          <label className="text-sm">Sort articles</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg shadow- focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </div>
        <div className="w-full flex flex-col items-center sm:w-auto sm:items-center sm:justify-center">
          <label className="text-sm">Order By</label>
          <select
            value={order}
            onChange={handleOrderChange}
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          author={article.author}
          title={article.title}
          body={article.body}
          topic={article.topic}
          votes={article.votes}
          article_img={article.article_img_url}
          comment_count={article.comment_count}
          created_at={article.created_at}
          article_id={article.article_id}
        />
      ))}
    </div>
  );
}

export default ArticlesList;
