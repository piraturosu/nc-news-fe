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

export function getUsers() {
  return baseApi.get(`/users`).then(({ data: { users } }) => {
    return users;
  });
}

export function patchArticleVote(article_id, body) {
  return baseApi
    .patch(`/articles/${article_id}`, body)
    .then(({ data: { article } }) => {
      return article;
    });
}

export function postComment(article_id, { username, body }) {
  return baseApi
    .post(`/articles/${article_id}/comments`, { username, body })
    .then(({ data: { comment } }) => {
      return comment;
    });
}
