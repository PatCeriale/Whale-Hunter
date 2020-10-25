$(document).ready(function() {
  
    $(".delete-beer-form").on("submit", function(event) {
      event.preventDefault();
      
      const beer_id = $(this).children(".user_id").val();
    
    
      $.ajax({
        method: "DELETE",
        url: "/beers/" + beer_id,
      }).then(function(data) {
       
        location.reload();
      });
    
    });
  });