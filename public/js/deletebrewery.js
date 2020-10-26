$(document).ready(function() {
  
    $(".delete-brewery-form").on("submit", function(event) {
      event.preventDefault();
      
      const brewery_id = $(this).children(".delete_brewery").val();
    
    
      $.ajax({
        method: "DELETE",
        url: "/breweries/" + brewery_id,
      }).then(function(data) {
       
        location.reload();
      });
    
    });
  });