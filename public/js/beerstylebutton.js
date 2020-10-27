$(document).ready(function () {
  $(".view-style-beers").on("click", function (event) {
    event.preventDefault();

    const style_id = $(this).val();

<<<<<<< HEAD
    console.log(style_id);
    location.assign("/findstyle/" + style_id)
=======
    location.assign("/beers/styles/" + style_id)
>>>>>>> origin
  });
});

