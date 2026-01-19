import { getComments, postComment } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { renderComments, initLikeButtons, initReplyComments } from "./reply.js";

export let token = localStorage.getItem("token");
export let userName = localStorage.getItem("userName");

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem("token", newToken);
};

export const setUserName = (newName) => {
  token = newToken;
  token;
  localStorage.setItem("token", newToken); // Ошибка: сохраняется не в тот ключ
};

export const logout = () => {
  token = null;
  userName = null;
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  initApp();
};

const appElement = document.getElementById("app");

export const initApp = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  getComments().then((responseData) => {
    const comments = responseData.comments.map((comment) => ({
      name: comment.author.name,
      date: new Date(comment.date).toLocaleString().slice(0, -3),
      text: comment.text,
      likes: comment.likes,
      isLiked: comment.isLiked,
    }));

    renderApp(comments);
  });
};

const renderApp = (comments) => {
  const commentsHtml = renderComments(comments);

  const appHtml = `
    <div class="container">
      <ul class="comments">${commentsHtml}</ul>
      ${
        token
          ? `
        <div class="add-form">
          <input type="text" class="add-form-name" value="${userName}" readonly />
          <textarea class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="add-button">Написать</button>
            <button class="add-form-button" id="logout-button">Выйти</button>
          </div>
        </div>`
          : `<p class="login-alert">Чтобы добавить комментарий, <span id="login-link" class="link-clickable">авторизуйтесь</span></p>`
      }
    </div>`;

  appElement.innerHTML = appHtml;

  initLikeButtons(comments, renderApp);
  initReplyComments(comments);

  if (!token) {
    document.getElementById("login-link").addEventListener("click", () => {
      renderLogin();
    });
  } else {
    const addButton = document.getElementById("add-button");
    const textInput = document.querySelector(".add-form-text");
    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", () => {
      logout();
    });

    addButton.addEventListener("click", () => {
      if (textInput.value.trim() === "") return;

      addButton.disabled = true;
      addButton.textContent = "Добавляю...";

      postComment({ text: textInput.value, token })
        .then(() => {
          initApp();
        })
        .catch((error) => {
          alert(error.message);
          addButton.disabled = false;
          addButton.textContent = "Написать";
        });
    });
  }
};

initApp();
