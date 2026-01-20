import { registration } from "./api.js";
import { setToken, setUserName, initApp } from "./index.js";
import { renderLogin } from "./renderLogin.js";

export const renderRegistration = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const app = document.getElementById("app");
  app.innerHTML = `
 <div class="container">
    <h1>Страница регистрации</h1>
    <div class="form">
      <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин"/>
        <input type="text" id="name-input" class="input" placeholder="Имя"/>
        <input type="password" id="password-input" class="input" placeholder="Пароль"/>
      </div>
      <br />
      <button class="button" id="register-button">Зарегистрироваться</button>
       <p class="form-link-text">Уже есть аккаунт? <a id="tologin-link" href="#" class="link-clickable">Войти</a>
      </p> 
    </div>
  </div>`;

  const registerButton = document.getElementById("register-button");
  const loginLink = document.getElementById("tologin-link");

  registerButton.addEventListener("click", () => {
    const login = document.getElementById("login-input").value;
    const name = document.getElementById("name-input").value;
    const password = document.getElementById("password-input").value;

    if (!login || !name || !password) {
      alert("Заполните все поля");
      return;
    }

    registration({ login, name, password })
      .then((data) => {
        setToken(data.user.token);
        setUserName(data.user.name);
        initApp();
      })
      .catch((error) => alert(error.message));
  });

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    renderLogin();
  });
};
