$(document).ready(function() {
  
    $(".delete-style-form").on("submit", function(event) {
      event.preventDefault();
      
      const style_id = $(this).children(".delete_style").val();
    
      $.ajax({
        method: "DELETE",
        url: "/styles/" + style_id,
      }).then(function(data) {
       
        location.reload();
      });
    
    });
  });