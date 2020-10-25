$(document).ready(function() {
  
    $(".delete-style-form").on("submit", function(event) {
      event.preventDefault();
      
      const style_id = $(this).children(".user_id").val();
      console.log("CLICK:",style_id)
    
      $.ajax({
        method: "DELETE",
        url: "/styles/" + style_id,
      }).then(function(data) {
       
        location.reload();
      });
    
    });
  });