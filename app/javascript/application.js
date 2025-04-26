import "@hotwired/turbo-rails"
import Rails from "@rails/ujs"
import "bootstrap"


Rails.start()

// Optional: If you're using Stimulus controllers
// import "controllers"

console.log("✅ JavaScript loaded!")


document.addEventListener("DOMContentLoaded", () => {
  const likeButtons = document.querySelectorAll(".like-toggle-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const likeableId = button.dataset.likeableId;
      const likeableType = button.dataset.likeableType;
      const liked = button.dataset.action === "unlike";
      const likeId = button.dataset.likeId; // Needed for reply unlike
      const token = document.querySelector("meta[name='csrf-token']").content;

      let path = "";
      let method = "";

      if (likeableType === "Post") {
        path = `/posts/${likeableId}/like`;
        method = liked ? "DELETE" : "POST";
      } else if (likeableType === "Reply") {
        if (liked && likeId) {
          path = `/replies/${likeableId}/likes/${likeId}`;
          method = "DELETE";
        } else {
          path = `/replies/${likeableId}/likes`;
          method = "POST";
        }
      }

      fetch(path, {
        method: method,
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
      .then((response) => {
        console.log("Before update:", button.dataset.action, button.dataset.liked, button.dataset.liked = (liked ? "false" : "true"))
      

        if (response.ok) {
          // toggle action
          button.dataset.action = liked ? "like" : "unlike";
          button.textContent = liked ? "🤍 Like" : "💔 Unlike";
      
          const wrapper = button.closest(".like-wrapper");
          const likeCountSpan = wrapper.querySelector(".like-count");
          const currentCount = parseInt(likeCountSpan.textContent, 10);
          const newCount = liked ? currentCount - 1 : currentCount + 1;
          likeCountSpan.textContent = newCount;
      
          // For replies, update likeId on the button
          if (!liked && likeableType === "Reply") {
            response.json().then(data => {
              if (data.like_id) {
                button.dataset.likeId = data.like_id;
              }
            });
          } else if (liked) {
            delete button.dataset.likeId;
          }
        }
      })
      
      .catch((error) => {
        console.error("❌ JS Error:", error);
      });
    });
  });

  // Prevent post/reply card clicks from triggering like/delete buttons
  const replyCards = document.querySelectorAll(".reply-card");

  replyCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (
        event.target.closest(".like-toggle-button") ||
        event.target.closest(".delete-reply-button")
      ) {
        event.stopPropagation();
        return;
      }

      const url = card.dataset.url;
      if (url) {
        window.location.href = url;
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById("rating-stars-input");


  stars.forEach((star, idx) => {
    const starIndex = idx + 1;

    star.addEventListener('mouseover', () => {
      clearHover();
      highlightStars(starIndex);
    });

    star.addEventListener('mouseout', () => {
      clearHover();
      highlightStars(parseInt(ratingInput.value));
    });

    star.addEventListener('click', () => {
      ratingInput.value = starIndex;
      highlightStars(starIndex);
    });
  });

  function highlightStars(count) {
    stars.forEach((star, idx) => {
      star.classList.toggle('hovered', idx < count);
    });
  }

  function clearHover() {
    stars.forEach(star => {
      star.classList.remove('hovered');
    });
  }

  // Initialize based on saved rating
  if (ratingInput) {
    highlightStars(parseInt(ratingInput.value));
  }
});


document.addEventListener('shown.bs.collapse', function (event) {
  if (event.target.id === 'reviewCollapse') {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating-stars');

    stars.forEach((star, idx) => {
      const starIndex = idx + 1;

      star.addEventListener('mouseover', () => {
        clearHover();
        highlightStars(starIndex);
      });

      star.addEventListener('mouseout', () => {
        clearHover();
        highlightStars(parseInt(ratingInput.value));
      });

      star.addEventListener('click', () => {
        ratingInput.value = starIndex;
        highlightStars(starIndex);
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll('#entityTabs .nav-link');

  const lastTab = localStorage.getItem("lastEntityTab");
  if (lastTab) {
    const triggerEl = document.querySelector(`#entityTabs .nav-link[href="#${lastTab}"]`);
    if (triggerEl) new bootstrap.Tab(triggerEl).show();
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("href").substring(1);
      localStorage.setItem("lastEntityTab", tabId);
    });
  });
});
