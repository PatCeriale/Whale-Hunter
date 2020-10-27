
$(document).ready(function () {

    $(".support-button").on("click", function (event) {
        event.preventDefault();
        console.log("CLICK")
        $("#support-modal").addClass("is-active");

    });
});



$(document).ready(function () {

    $(".close-modal").on("click", function (event) {
        event.preventDefault();

        $(".modal").removeClass("is-active");
    });
});