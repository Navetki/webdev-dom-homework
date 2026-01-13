const listElement = document.querySelector(".comments");
const commentInput = document.querySelector(".add-form-text");

function like(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

const pushLikeButtons = (comments) => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      const comment = comments[index];

      if (comment.isLikeLoading) {
        return;
      }

      comment.isLikeLoading = true;
      renderComments(comments);

      like(2000).then(() => {
        comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
        comment.isLiked = !comment.isLiked;

        comment.isLikeLoading = false;
        renderComments(comments);
      });
    });
  }
};

const ReplyComments = (comments) => {
  const commentElements = document.querySelectorAll(".comment");
  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      const comment = comments[index];
      commentInput.value = `> ${comment.text}\n${comment.name}, `;
      commentInput.focus();
    });
  }
};

export const renderComments = (comments) => {
  const commentsHtml = comments
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

  listElement.innerHTML = commentsHtml;
  pushLikeButtons(comments);
  ReplyComments(comments);
};
