import { sanitizeHtml } from "./sanitize.js";
import { fetchComment } from "./api.js";
import { fetchgetAndRenderComments } from "./fetchAndRenderTasks.js";

const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");
const addFormElement = document.getElementById("add-form");
const listLoader = document.getElementById("list-loader");
const formLoader = document.getElementById("form-loader");

fetchgetAndRenderComments(listLoader).catch((error) => {
  alert(error.message);
});

const userClick = () => {
  const name = nameInput.value;
  const text = commentInput.value;

  if (name.trim().length < 3 || text.trim().length < 3) {
    alert("Имя и комментарий должны содержать хотя бы 3 символа");
    return;
  }

  addFormElement.style.display = "none";
  formLoader.style.display = "block";

  fetchComment({
    name: sanitizeHtml(name),
    text: sanitizeHtml(text),
  })
    .then(() => {
      return fetchgetAndRenderComments(listLoader);
    })
    .then(() => {
      formLoader.style.display = "none";
      addFormElement.style.display = "flex";
      nameInput.value = "";
      commentInput.value = "";
    })
    .catch((error) => {
      if (error.message === "Ошибка сервера, попробуйте позже") {
        console.warn("Ошибка сервера, пробуем еще раз...");
        userClick();
        return;
      }

      formLoader.style.display = "none";
      addFormElement.style.display = "flex";

      if (error.message === "Failed to fetch") {
        alert("Интернет пропал. Попробуйте позже");
      } else {
        alert(error.message);
      }
    });
};

addButton.addEventListener("click", userClick);
