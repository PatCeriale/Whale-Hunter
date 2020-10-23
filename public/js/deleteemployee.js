$(document).ready(function() {
  
    $(".delete-employee-form").on("submit", function(event) {
      event.preventDefault();
      
      const user_id = $(this).children(".user_id").val();
    
      $.ajax({
        method: "DELETE",
        url: "/employees/" + user_id,
      }).then(function(data) {
       
        location.reload();
      });
    
    });
  });