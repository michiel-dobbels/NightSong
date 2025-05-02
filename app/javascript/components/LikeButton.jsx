import React, { useState } from "react";

export default function LikeButton({ postId, replyId, initialLiked, initialLikesCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const toggleLike = async () => {
    const method = liked ? "DELETE" : "POST";
    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    const url = replyId
      ? `/replies/${replyId}/like`
      : `/posts/${postId}/like`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(!liked);
        setLikesCount(data.like_count);
      } else {
        console.error("Toggle failed:", response.status);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div>
      <button onClick={toggleLike} className={`btn btn-${liked ? "danger" : "secondary"} btn-sm`}>
        {liked ? "❤️ Unlike" : "🤍 Like"}
      </button>
      <span className="ms-2">{likesCount} likes</span>
    </div>
  );
}
