import { getComments } from "./api.js";
import { renderComments } from "./reply.js";
import { token } from "./index.js";
import { renderAddForm } from "./renderAddForm.js";
import { renderLogin } from "./renderLogin.js";

export const fetchgetAndRenderComments = (listLoader) => {
  return getComments()
    .then((responseData) => {
      const tasks = responseData.comments || [];

      const commentsData = tasks.map((task) => {
        return {
          name: task.author ? task.author.name : "Неизвестный",

          date: new Date(task.date).toLocaleString().slice(0, -3),
          text: task.text,
          likes: task.likes || 0,
          isLiked: task.isLiked || false,
        };
      });

          const commentsListElement = document.querySelector(".comments");
      if (commentsListElement) {commentsListElement.innerHTML = renderComments(commentsData);
      }

      const container = document.getElementById("add-form-container");
      if (container) {
        if (token) {
          renderAddForm(container);
        } else {
          container.innerHTML = `<p class="login-alert">Чтобы добавить комментарий, <a id="login-link" href="#" class="link-clickable">авторизуйтесь</a></p>`;
       const loginLink = document.getElementById("login-link");
          if (loginLink) {loginLink.addEventListener("click", (event) => {event.preventDefault(); 
              renderLogin(); 
            });
          }
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
