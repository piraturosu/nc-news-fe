import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://nc-news-w6mu.onrender.com/api",
});

export function getArticles() {
  return baseApi.get("/articles").then(({ data }) => {
    return data;
  });
}

export function getArticleById(id) {
  return baseApi.get(`/articles/${id}`).then(({ data }) => {
    return data;
  });
}

export function getCommentsByArticleId(id) {
  return baseApi.get(`/articles/${id}/comments`).then(({ data }) => {
    return data;
  });
}
