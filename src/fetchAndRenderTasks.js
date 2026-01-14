import { fetchRender } from "./api.js";
import { renderComments } from "./reply.js";

export const fetchgetAndRenderComments = (listLoader) => {
  return fetchRender()
    .then((responseData) => {
      const commentsData = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString().slice(0, -3),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });

      renderComments(commentsData);
    })
    .then(() => {
      if (listLoader) {
        listLoader.style.display = "none";
      }
    });
};
