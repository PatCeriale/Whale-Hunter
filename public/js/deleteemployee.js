$(document).ready(function() {
  
    $(".delete-employee-form").on("submit", function(event) {
      event.preventDefault();
      
      const user_id = $(this).children(".delete_employee").val();
    
      $.ajax({
        method: "DELETE",
        url: "/employees/" + user_id,
      }).then(function(data) {
       
        location.reload();
      });
    
    });
  });