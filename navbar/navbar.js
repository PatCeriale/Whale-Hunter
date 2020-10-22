$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

// $(".navbar").append(`
//   <div class="image-cropper">
//   <img class="whalez" src="https://i.pinimg.com/originals/6f/20/39/6f2039da60d44bd4af2976367e4e35be.jpg"
// alt="whale bottle">
// </div>`);
