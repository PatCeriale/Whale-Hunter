  $(document).ready(function() {
  
    $(".delete-sixpack").on("click", function(event) {
      event.preventDefault();

      
      const sixpack_id = $(this).val();

   
      
      $.ajax({
        method: "DELETE",
        url: "/sixpacks/" + sixpack_id,
      }).then(function(data) {
       
        location.reload();
      });
    
      
    });
  });
