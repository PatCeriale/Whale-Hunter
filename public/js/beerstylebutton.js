$(document).ready(function () {
  $(".view-style-beers").on("click", function (event) {
    event.preventDefault();
    console.log("CLICK")

    const style_id = $(this).val();

    console.log(style_id);
    location.assign("/findstyle/" + style_id)
  });
});

