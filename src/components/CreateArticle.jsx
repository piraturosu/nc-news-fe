import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { useNavigate } from "react-router-dom";
import { getTopics, postArticle } from "../api";

function CreateArticle() {
  const { user } = useContext(LoggedInUserContext);
  const [articleData, setArticleData] = useState({
    author: `${user.username}`,
    title: "",
    body: "",
    topic: "coding",
    article_img_url: "",
  });
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  function handleChange(event) {
    const { id, value } = event.target;
    setArticleData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    postArticle(articleData)
      .then(() => {
        setArticleData({
          author: `${user.username}`,
          title: "",
          body: "",
          topic: "coding",
          article_img_url: "",
        });
        window.alert("Article created successfully!");
        setError(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to create article. Please try again.");
      });
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-4">Create a New Article</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-250 min-w-fit"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Article Title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="topic"
          >
            Select Topic
          </label>
          <select
            type="text"
            id="topic"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          >
            {topics.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="body"
            placeholder="Article Content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="10"
            cols="30"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="article_img_url"
          >
            Article Image URL
          </label>
          <input
            type="text"
            id="article_img_url"
            placeholder="Article Image URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
