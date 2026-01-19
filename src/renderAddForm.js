import { sanitizeHtml } from "./sanitize.js";
import { postComment } from "./api.js";
import { fetchgetAndRenderComments } from "./fetchAndRenderTasks.js";
import { token, userName } from "./index.js";

export const renderAddForm = (container) => {
  container.innerHTML = `
    <div class="add-form" id="add-form">
      <input type="text" class="add-form-name" value="${userName}" readonly />
      <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>
    <div id="form-loader" style="display: none">Комментарий добавляется...</div>
  `;

  const addButton = container.querySelector(".add-form-button");
  const commentInput = container.querySelector(".add-form-text");
  const formLoader = document.getElementById("form-loader");
  const addForm = document.getElementById("add-form");

  addButton.addEventListener("click", () => {
    const text = commentInput.value;

    if (text.trim().length < 3) {
      alert("Минимум 3 символа в комментарии");
      return;
    }

    addForm.style.display = "none";
    formLoader.style.display = "block";

    postComment({ text: sanitizeHtml(text), token })
      .then(() => {
        return fetchgetAndRenderComments(
          document.getElementById("list-loader")
        );
      })
      .then(() => {
        commentInput.value = "";
        addForm.style.display = "flex";
        formLoader.style.display = "none";
      })
      .catch((error) => {
        addForm.style.display = "flex";
        formLoader.style.display = "none";
        alert(error.message);
      });
  });
};
