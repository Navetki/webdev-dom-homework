const Url = "https://wedev-api.sky.pro/api/v1/navetkina-zhanna/comments";
export const fetchRender = () => {
  return fetch(Url, {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Сервер упал");
      }
      throw new Error("Что-то пошло не так");
    }
    return response.json();
  });
};

export const fetchComment = ({ name, text }) => {
  return fetch(Url, {
    method: "POST",
    body: JSON.stringify({
      name,
      text,
    }),
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Имя и комментарий должны быть не короче 3 символов");
      }
      if (response.status === 500) {
        throw new Error("Сервер упал");
      }
      throw new Error("Что-то пошло не так");
    }
    return response.json();
  });
};
