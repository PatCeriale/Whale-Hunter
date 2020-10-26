$(document).ready(function () {

    $(".edit-employee-form").on("submit", function (event) {
        event.preventDefault();

        $("#employee-modal").addClass("is-active");
        const employee_id = $(this).children(".edit_employee").val();

        $.ajax({
            method: "get",
            url: "/employees/" + employee_id,
        }).then(function (data) {
            $('#user_name_modal').val(data.user_name);
            $('#first_name_modal').val(data.first_name);
            $('#last_name_modal').val(data.last_name);
            $("#employee-put-form").attr('action', "/employees/update/" + data.id);
        });


    });
});

$(document).ready(function () {

    $(".edit-style-form").on("submit", function (event) {
        event.preventDefault();

        $("#style-modal").addClass("is-active");
        const style_id = $(this).children(".edit_style").val();

        $.ajax({
            method: "get",
            url: "/styles/" + style_id,
        }).then(function (data) {
            $('#style_name_modal').val(data.name);
            $('#style-description_modal').text(data.description);
            $('#url_style_modal_text').val(data.image);
            $("#style-id").val(data.id);
        });


    });
});

$(document).ready(function () {
    $("#upload_style_modal_widget").on("click", function (event) {
        event.preventDefault();
        cloudinary.openUploadWidget({ cloud_name: 'crowandrew', upload_preset: 'rndheh5h' },
            function (error, result) {
                if (result.event === "success") {
                    $("#url_style_modal_text").val(result.info.url);
                }
            });

    });
});

$(document).ready(function () {

    $(".save-style-modal").on("click", function (event) {
        event.preventDefault();
        const id = $("#style-id").val();
        const name = $('#style_name_modal').val();
        const description = $('#style-description_modal').text();

        $.ajax({
            method: "PUT",
            url: "/STYLE/" + style_id,
          }).then(function(data) {
           
            location.reload();
          });
    });
});

$(document).ready(function () {

    $(".close-modal").on("click", function (event) {
        event.preventDefault();

        $(".modal").removeClass("is-active");
    });
});