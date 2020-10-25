$(document).ready(function() {
  
    $(".edit-employee-form").on("submit", function(event) {
      event.preventDefault();
      
      $("#employee-modal").addClass("is-active");
        const employee_id = $(this).children(".edit_employee").val();

      $.ajax({
        method: "get",
        url: "/employees/" + employee_id,
      }).then(function(data) {
        $('#user_name_modal').val(data.user_name);
        $('#first_name_modal').val(data.first_name);
        $('#last_name_modal').val(data.last_name);
        $("#employee-put-form").attr('action', "/employees/update/" + data.id);
      });

    
    });
  });

  $(document).ready(function() {
  
    $(".close-modal").on("click", function(event) {
      event.preventDefault();
      
      $(".modal").removeClass("is-active");
    });
  });