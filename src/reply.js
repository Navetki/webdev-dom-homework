function like(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

// Переименовал функцию, чтобы было понятно, что она вешает события
export const initLikeButtons = (comments, renderApp) => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      const comment = comments[index];

      if (comment.isLikeLoading) return;

      comment.isLikeLoading = true;
      renderApp(comments); // Вызываем отрисовку всего приложения, чтобы показать лоадер лайка

      like(2000).then(() => {
        comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        renderApp(comments); // Перерисовываем всё приложение с обновленным лайком
      });
    });
  }
};

export const initReplyComments = (comments) => {
  const commentElements = document.querySelectorAll(".comment");
  const commentInput = document.querySelector(".add-form-text");

  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      const comment = comments[index];
      // Защита: если пользователь не авторизован, инпута нет, поэтому проверяем его наличие
      if (commentInput) {
        commentInput.value = `> ${comment.text}\n${comment.name}, `;
        commentInput.focus();
      }
    });
  }
};

// Эта функция теперь ТОЛЬКО возвращает строку HTML
export const renderComments = (comments) => {
  return comments
    .map((comment, index) => {
      return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index="${index}" class="like-button ${
            comment.isLiked ? "-active-like" : ""
          } ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
        </div>
      </div>
    </li>`;
    })
    .join("");
};
