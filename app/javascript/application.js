import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import QuoteCard from "./components/QuoteCard";
import LikeButton from "./components/LikeButton";
import Rails from "@rails/ujs";

import ReplyThread from "./components/ReplyThread";
Rails.start();





document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[id^='react-root-']").forEach((node) => {
    const quoteId = node.dataset.quoteId;
    const quoteText = node.dataset.quoteText;
    const initialLiked = node.dataset.initialLiked === "true";
    const likesCount = parseInt(node.dataset.likesCount);

    const root = createRoot(node);
    root.render(
      <QuoteCard
        quoteId={quote.id}
        quoteText={quote.content}
        initialLiked={quote.liked_by_current_user}
        initialLikesCount={quote.likes_count}
      />

    );
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const reactRoot = document.getElementById("react-root");
  if (reactRoot) {
    const entityId = window.location.pathname.split("/")[2];

    fetch(`/entities/${entityId}/quotes.json`)
      .then((res) => res.json())
      .then((quotes) => {
        const root = createRoot(reactRoot);
        root.render(<App quotes={quotes} />);
      })
      .catch((err) => console.error("Error loading quotes:", err));
  }
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".react-quote").forEach((node) => {
    const quoteId = node.dataset.quoteId;
    const quoteText = node.dataset.quoteText;
    const initialLiked = node.dataset.initialLiked === "true";
    const initialLikesCount = parseInt(node.dataset.likesCount, 10);

    const root = createRoot(node);
    root.render(
      <QuoteCard
        quoteId={quoteId}
        quoteText={quoteText}
        initialLiked={initialLiked}
        initialLikesCount={initialLikesCount}
      />
    );
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".react-quote").forEach((node) => {
    const quoteId = node.dataset.quoteId;
    const quoteText = node.dataset.quoteText;
    const initialLiked = node.dataset.initialLiked === "true";
    const likesCount = parseInt(node.dataset.likesCount);

    const root = createRoot(node);
    root.render(
      <QuoteCard
        quoteId={quoteId}
        quoteText={quoteText}
        initialLiked={initialLiked}
        initialLikesCount={likesCount}
      />
    );
  });
});





const mountedRoots = new WeakMap();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".react-like").forEach((node) => {
    if (!mountedRoots.has(node)) {
      const postId = node.dataset.postId;
      const liked = node.dataset.liked === "true";
      const count = parseInt(node.dataset.count, 10);

      const root = createRoot(node);
      root.render(
        <LikeButton
          postId={postId}
          initialLiked={liked}
          initialLikesCount={count}
        />
      );
      mountedRoots.set(node, root);
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("react-replies");
  if (el) {
    const root = createRoot(el);
    const postId = el.dataset.postId;
    const replies = JSON.parse(el.dataset.initialReplies);
    const currentUserId = parseInt(el.dataset.currentUserId, 10); // ✅ make sure this line exists

    root.render(
      <ReplyThread
        postId={postId}
        initialReplies={replies}
        currentUserId={currentUserId} // ✅ and this
      />
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".react-replies").forEach((node) => {
    const postId = node.dataset.postId;
    const currentUserId = parseInt(node.dataset.currentUserId);
    const initialReplies = JSON.parse(node.dataset.initialReplies);

    const root = createRoot(node);
    root.render(
      <ReplyThread
        postId={postId}
        currentUserId={currentUserId}
        initialReplies={initialReplies}
      />
    );
  });
});
