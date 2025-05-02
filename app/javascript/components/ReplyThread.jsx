import React, { useState } from "react";
import LikeButton from "./LikeButton";

function timeAgo(dateString) {
  const now = new Date();
  const posted = new Date(dateString);
  const diff = Math.floor((now - posted) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function ReplyThread({ postId, initialReplies, currentUserId }) {
  const [replies, setReplies] = useState(initialReplies);
  const [newReply, setNewReply] = useState("");

  const handleDelete = async (replyId) => {
    const confirmed = window.confirm("Are you sure you want to delete this reply?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/posts/${postId}/replies/${replyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setReplies(replies.filter((r) => r.id !== replyId));
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete reply.");
      }
    } catch (err) {
      console.error("Error deleting reply:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReply.trim() === "") return;

    const isReplyPage = window.location.pathname.includes("/replies/");
    const basePath = isReplyPage ? "/replies" : "/posts";

    const res = await fetch(`${basePath}/${postId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
        Accept: "application/json",
      },
      body: JSON.stringify({ reply: { content: newReply } }),
    });

    if (res.ok) {
      const json = await res.json();
      setReplies([...replies, json]);
      setNewReply("");
    } else {
      const err = await res.json();
      alert(err.error || "Failed to create reply.");
    }
  };

  const navigateToReply = (id) => {
    window.location.href = `/replies/${id}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-2"
          placeholder="Write a reply..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <button className="btn btn-outline-success">Post Reply</button>
      </form>

      <div className="mt-3">
        {replies.length === 0 ? (
          <p className="text-muted">No replies yet.</p>
        ) : (
          replies.map((reply) => (
            <div key={reply.id} className="card mb-2">
              <div
                className="card-body"
                onClick={() => navigateToReply(reply.id)}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <a
                    href={`/users/${reply.user_id}`}
                    className="fw-semibold text-primary text-decoration-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {reply.user_name}
                  </a>
                  <small className="text-muted">{timeAgo(reply.created_at)}</small>
                </div>

                <p className="mb-0">{reply.content}</p>

                <div
                  className="d-flex align-items-center gap-2 mt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LikeButton
                    postId={postId}
                    replyId={reply.id}
                    initialLiked={reply.liked_by_current_user}
                    initialLikesCount={reply.likes_count}
                  />

                  {reply.user_id === currentUserId && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(reply.id);
                      }}
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReplyThread;
