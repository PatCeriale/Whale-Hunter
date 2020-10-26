$(document).ready(function () {
  $(".view-style-beers").on("click", function (event) {
    event.preventDefault();

    const style_id = $(this).val();

    location.assign("/beers/styles/" + style_id)
  });
});

