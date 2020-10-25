$(document).ready(function() {
  
    $(".delete-brewery-form").on("submit", function(event) {
      event.preventDefault();
      
      const brewery_id = $(this).children(".user_id").val();
    
    
      $.ajax({
        method: "DELETE",
        url: "/breweries/" + brewery_id,
      }).then(function(data) {
       
        location.reload();
      });
    
    });
  });