$(document).ready(function() {
  
    $(".add-six-pack").on("click", function(event) {
      event.preventDefault();
      Toastify({
        text: "Beer Added",
        backgroundColor: "#b98843",
        duration: 3000
        }).showToast(); 

      const beer_id = $(this).val();
      
      $.ajax({
        method: "PUT",
        url: "/sixpacks/" + beer_id,
      }).then(function(data) { 
        location.reload();
      });
    
      
    });
  });
  