import { sanitizeHtml } from "./sanitize.js";
import { fetchRender } from "./api.js";
import { fetchgetAndRenderComments } from "./fetchAndRenderTasks.js";
import { token } from "./index.js";

export const renderAddForm = (container) => {
  container.innerHTML = `
    <div class="add-form" id="add-form">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>
    <div id="form-loader" style="display: none">Комментарий добавляется...</div>
  `;

  const addButton = container.querySelector(".add-form-button");
  const nameInput = container.querySelector(".add-form-name");
  const commentInput = container.querySelector(".add-form-text");
  const formLoader = document.getElementById("form-loader");
  const addForm = document.getElementById("add-form");

  addButton.addEventListener("click", () => {
    const name = nameInput.value;
    const text = commentInput.value;

    if (name.trim().length < 3 || text.trim().length < 3) {
      alert("Минимум 3 символа");
      return;
    }

    addForm.style.display = "none";
    formLoader.style.display = "block";

    fetchComment({ name: sanitizeHtml(name), text: sanitizeHtml(text) })
      .then(() => {
        return fetchgetAndRenderComments(
          document.getElementById("list-loader")
        );
      })
      .then(() => {
        nameInput.value = "";
        commentInput.value = "";
      })
      .catch((error) => {
        addForm.style.display = "flex";
        formLoader.style.display = "none";
        alert(error.message);
      });
  });
};
