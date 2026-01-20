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
 <p class="form-link-text"> Нет аккаунта? <a id="toreg-link" href="#" class="link-clickable">Зарегистрироваться</a> </p>
</div>
</div>
`;

  document.getElementById("login-input").value = "";
  document.getElementById("password-input").value = "";


  document.getElementById("login-button").addEventListener("click", () => {
    const loginValue = document.getElementById("login-input").value;
    const passwordValue = document.getElementById("password-input").value;

    if (!loginValue || !passwordValue) {
      alert("Введите логин и пароль");
      return; }

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
    document.getElementById("toreg-link").addEventListener("click", (event) => {
    event.preventDefault(); 
    renderRegistration();
  });
};
