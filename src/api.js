import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://nc-news-w6mu.onrender.com/api",
});

export function getArticles(topic, sort_by, order) {
  let query = "/articles";

  const queryParts = [];

  if (topic) queryParts.push(`topic=${topic}`);
  if (sort_by) queryParts.push(`sort_by=${sort_by}`);
  if (order) queryParts.push(`order=${order}`);

  if (queryParts.length > 0) {
    query += "?" + queryParts.join("&");
  }
  return baseApi.get(query).then(({ data }) => {
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

export function deleteComment(comment_id) {
  return baseApi.delete(`/comments/${comment_id}`);
}

export function getTopics() {
  return baseApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
}
