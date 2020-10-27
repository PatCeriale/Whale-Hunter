$(document).ready(function () {
  $(".view-style-beers").on("click", function (event) {
    event.preventDefault();
    console.log("CLICK");

    const style_id = $(this).val();
    location.assign("/beers/styles/" + style_id);
  });
});
