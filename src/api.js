const Url = "https://wedev-api.sky.pro/api/v1/navetkina-zhanna/comments";

export const fetchRender = () => {
  return fetch(Url, {
    method: "GET",
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Ошибка сервера, попробуйте позже");
    }
    return response.json();
  });
};

// добавление задачи
export const fetchComment = ({ name, text }) => {
  return fetch(Url, {
    method: "POST",
    body: JSON.stringify({
      name,
      text,
      forceError: true, //  имитации  ошибки
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    }
    if (response.status === 500) {
      throw new Error("Ошибка сервера, попробуйте позже");
    }
    return response.json();
  });
};
