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
  alert("Ошибка загрузки" + error.message);
});

addButton.addEventListener("click", () => {
  const name = nameInput.value;
  const text = commentInput.value;

  if (name.trim().length < 3 || text.trim().length < 3) {
    alert("Имя и комментарий должен содержать хотя бы 3 символа");
    return;
  }

  if (addFormElement) addFormElement.style.display = "none";
  if (formLoader) formLoader.style.display = "block";

  fetchComment({
    name: sanitizeHtml(name),
    text: sanitizeHtml(text),
  })
    .then(() => {
      return fetchgetAndRenderComments(listLoader);
    })
    .then(() => {
      if (formLoader) formLoader.style.display = "none";
      if (addFormElement) addFormElement.style.display = "flex";
      nameInput.value = "";
      commentInput.value = "";
    })
    .catch((error) => {
      formLoader.style.display = "none";
      addFormElement.style.display = "flex";
      alert(error.message);
    });
});
