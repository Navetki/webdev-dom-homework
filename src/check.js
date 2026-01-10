import { renderComments } from "./reply.js";
import { sanitizeHtml } from "./sanitize.js";
import { fetchRender, fetchComment } from "./api.js";

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

let comments = [];

const fetchRenderComments = () => {
  return fetchRender()
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

fetchRenderComments();

addButton.addEventListener("click", () => {
  const name = nameInput.value;
  const text = commentInput.value;

  if (name.trim().length < 3 || text.trim().length < 3) {
    alert("Имя и комментарий должен содержать хотя бы 3 символа");
    return;
  }

  fetchComment({
    name: sanitizeHtml(name),
    text: sanitizeHtml(text),
  })
    .then(() => {
      return fetchRenderComments();
    })
    .then(() => {
      addButton.disabled = false;
      addButton.textContent = "Написать";
      nameInput.value = "";
      commentInput.value = "";
    })
    .catch((error) => {
      addButton.disabled = false;
      addButton.textContent = "Написать";
      alert(error.message);
    });
});
