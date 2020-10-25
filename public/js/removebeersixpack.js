$(document).ready(function() {
  
    $(".delete-beer").on("click", function(event) {
      event.preventDefault();
      console.log("CLICK")
      
      const beer_id = $(this)[0].dataset.beer
      const sixpack_id = $(this)[0].dataset.sixpack

      console.log(beer_id,sixpack_id);

      $.ajax({
        method: "DELETE",
        url: "/sixpacks/"+ sixpack_id + "/" + beer_id,
      }).then(function(data) {
       
        location.reload();
      });
    
      
    });
  });