import { comments } from "./comments.js";
import { renderComments } from "./reply.js";
import { sanitizeHtml } from "./sanitize.js";

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

const checkInputs = () => {
  addButton.disabled =
    nameInput.value.trim() === "" || commentInput.value.trim() === "";
};

nameInput.addEventListener("input", checkInputs);
commentInput.addEventListener("input", checkInputs);

addButton.addEventListener("click", () => {
  if (nameInput.value.trim() === "" || commentInput.value.trim() === "") {
    return;
  }

  const date = new Date().toLocaleString().slice(0, -3);

  comments.push({
    name: sanitizeHtml(nameInput.value),
    date: date,
    text: sanitizeHtml(commentInput.value),
    likes: 0,
    isLiked: false,
  });

  renderComments();

  nameInput.value = "";
  commentInput.value = "";
  addButton.disabled = true;
});

renderComments();
