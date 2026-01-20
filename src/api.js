const personalKey = "navetkina-zhanna";
const baseUrl = `https://wedev-api.sky.pro/api/v2/${personalKey}`;
const userUrl = "https://wedev-api.sky.pro/api/user";

export const getComments = () => {
  return fetch(baseUrl + "/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 500) throw new Error("Сервер упал");
    return response.json();
  });
};

// Добавление комментария (нужен токен)
export const postComment = ({ text, token }) => {
  return fetch(baseUrl + "/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  }).then((response) => {
    if (response.status === 400)
      throw new Error("Комментарий слишком короткий");
    if (response.status === 500) throw new Error("Сервер упал");
    return response.json();
  });
};

// Авторизация
export const loginUser = ({ login, password }) => {
  return fetch(userUrl + "/login", {
    method: "POST",

    body: JSON.stringify({ login, password }),
  }).then((response) => {
    if (response.status === 400) throw new Error("Неверный логин или пароль");
    return response.json();
  });
};

// Регистрация
export const registration = ({ login, name, password }) => {
  return fetch(userUrl, {
    method: "POST",

    body: JSON.stringify({ login, name, password }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    }
    return response.json();
  });
};
