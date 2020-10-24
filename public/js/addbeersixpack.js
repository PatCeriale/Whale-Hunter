$(document).ready(function() {
  
    $(".add-six-pack").on("click", function(event) {
      event.preventDefault();
      
      const beer_id = $(this).val();
      
      $.ajax({
        method: "PUT",
        url: "/sixpacks/" + beer_id,
      }).then(function(data) {
       
        location.reload();
      });
    
      
    });
  });