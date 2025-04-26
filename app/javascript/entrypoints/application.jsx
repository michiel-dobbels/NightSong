import React from "react";
import { createRoot } from "react-dom/client";
import HelloWorld from "../../frontend/components/HelloWorld";

document.addEventListener("DOMContentLoaded", () => {
  const reactRoot = document.getElementById("react-spider");
  if (reactRoot) {
    const root = createRoot(reactRoot);
    root.render(<HelloWorld />);
  }
});
