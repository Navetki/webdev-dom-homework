import { fetchRender } from "./api.js";
import { renderComments } from "./reply.js";
import { token } from "./index.js";
import { renderAddForm } from "./renderAddForm.js";

export const fetchgetAndRenderComments = (listLoader) => {
  return fetchRender(token)
    .then((responseData) => {
      const tasks = responseData.todos || responseData.comments || [];

      const commentsData = tasks.map((task) => {
        return {
          name: task.author ? task.author.name : "Неизвестный",

          date: new Date(task.date).toLocaleString().slice(0, -3),
          text: task.text,
          likes: task.likes || 0,
          isLiked: task.isLiked || false,
        };
      });

      renderComments(commentsData);

      const container = document.getElementById("add-form-container");
      if (container) {
        if (token) {
          renderAddForm(container);
        } else {
          container.innerHTML = `<p class="login-alert">Чтобы добавить комментарий, <button id="login-link" class="link-button">авторизуйтесь</button></p>`;
        }
      }
    })
    .then(() => {
      if (listLoader) listLoader.style.display = "none";
    })
    .catch((error) => {
      console.error("Ошибка загрузки:", error);
    });
};
