import { loginUser } from "./api.js";
import { setToken, setUserName, initApp } from "./index.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLogin = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const appElement = document.getElementById("app");
  appElement.innerHTML = `
  <div class="container">
<h1> Страница входа</h1>
<div class="form">
<h3 class="form-title">Форма входа</h3>
<div class="form-row">
<input type="text" id="login-input" class="input" />
<input type="password" id="password-input" class="input" placeholder="Пароль"/>
</div>
<br />
<button class="button" id="login-button">Войти</button>
 <p class="form-link-text"> Нет аккаунта? <span id="toreg-link" class="link-clickable">Зарегистрироваться</span> </p>
</div>
</div>
`;

  document.getElementById("login-button").addEventListener("click", () => {
    const loginValue = document.getElementById("login-input").value;
    const passwordValue = document.getElementById("password-input").value;

    loginUser({ login: loginValue, password: passwordValue })
      .then((responseData) => {
        setToken(responseData.user.token);
        setUserName(responseData.user.name);
        initApp();
      })
      .catch((error) => {
        alert(error.message);
      });
  });
  document.getElementById("toreg-link").addEventListener("click", () => {
    renderRegistration();
  });
};
