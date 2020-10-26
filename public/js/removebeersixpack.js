$(document).ready(function() {
  
    $(".delete-beer").on("click", function(event) {
      event.preventDefault();
      
      const beer_id = $(this)[0].dataset.beer
      const sixpack_id = $(this)[0].dataset.sixpack


      $.ajax({
        method: "DELETE",
        url: "/sixpacks/"+ sixpack_id + "/" + beer_id,
      }).then(function(data) {
       
        location.reload();
      });
    
      
    });
  });