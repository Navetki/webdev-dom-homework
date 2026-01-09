import { renderComments } from "./reply.js";
import { sanitizeHtml } from "./sanitize.js";

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

let comments = [];

const fetchRender = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/navetkina-zhanna/comments", {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер упал");
      }
      return response.json();
    })
    .then((responseData) => {
      comments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString().slice(0, -3),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });
      renderComments(comments);
    })
    .catch((error) => {
      alert(error.message);
    });
};

fetchRender();

addButton.addEventListener("click", () => {
  if (
    nameInput.value.trim().length < 3 ||
    commentInput.value.trim().length < 3
  ) {
    alert("Имя и комментарий должен содержать хотя бы 3 символа");
    return;
  }

  addButton.disabled = true;
  addButton.textContent = "Добавление...";

  fetch("https://wedev-api.sky.pro/api/v1/navetkina-zhanna/comments", {
    method: "POST",
    body: JSON.stringify({
      text: sanitizeHtml(commentInput.value),
      name: sanitizeHtml(nameInput.value),
    }),
  })
    .then(() => fetchRender())
    .then(() => {
      addButton.disabled = false;
      addButton.textContent = "Написать";
      nameInput.value = "";
      commentInput.value = "";
    })
    .catch((error) => {
      addButton.disabled = false;
      addButton.textContent = "Написать";
      alert("Кажется, что-то пошло не так...");
    });
});
