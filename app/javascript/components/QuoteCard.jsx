import React, { useState } from "react";

export default function QuoteCard({ quoteId, quoteText, initialLiked, initialLikesCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const toggleLike = async () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    const method = liked ? "DELETE" : "POST";

    try {
      const response = await fetch(`/quotes/${quoteId}/like`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(!liked);
        setLikesCount(data.like_count);
      } else {
        console.error("Failed to toggle like", response.status);
      }
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <p>{quoteText}</p>
      <button onClick={toggleLike} style={{
        padding: "5px 10px",
        borderRadius: "5px",
        backgroundColor: liked ? "red" : "gray",
        color: "white",
        border: "none"
      }}>
        {liked ? "Unlike ❤️" : "Like ♡"}
      </button>
      <span style={{ marginLeft: "10px" }}>{likesCount} likes</span>
    </div>
  );
}
