$(document).ready(function() {
  
    $(".ahab").on("click", function(event) {
      event.preventDefault();
      
      const beer_id = $(this)[0].dataset.index
      
      $.ajax({
        method: "POST",
        url: "/ratings/" + beer_id,
      }).then(function(data) {
       
        location.reload();
      });
    
      
    });
  });