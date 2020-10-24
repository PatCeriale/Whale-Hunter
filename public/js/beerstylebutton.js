$(document).ready(function () {
  $(".view-style-beers").on("click", function (event) {
    event.preventDefault();

    const style_id = $(this).val();

    $.ajax({
      method: "GET",
      url: "/styles/" + style_id,
    }).then(function (data) {
      location.reload();
    });
  });
});
