// Clear form after successful submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".send-message form");

  if (form) {
    form.addEventListener("submit", function (e) {
      // Clear the form after submission
      setTimeout(() => {
        form.reset();
      }, 100);
    });
  }
});
