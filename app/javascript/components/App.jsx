import React, { useState } from "react";

export default function QuoteCard({ initialLiked = false, quoteText = "Default quote..." }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);

    // Later: send fetch POST/DELETE to backend here
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
      <p>{quoteText}</p>
      <button onClick={toggleLike} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: liked ? "red" : "gray", color: "white", border: "none" }}>
        {liked ? "Unlike ❤️" : "Like ♡"}
      </button>
      <span style={{ marginLeft: "10px" }}>{likesCount} likes</span>
    </div>
  );
}
