import axios from "axios";

export function getArticles() {
  return axios
    .get("https://nc-news-w6mu.onrender.com/api/articles")
    .then(({ data }) => {
      return data;
    });
}
