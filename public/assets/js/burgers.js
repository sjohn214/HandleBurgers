// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      var newEaten = $(this).data("neweaten");
      console.log(event);
      var newlyEaten = {
        devoured: newEaten,
      };
  
      // Send the PUT request.
      $.ajax("/burgers/devoured/" + id, {
        type: "PUT",
        data: newlyEaten
      }).then(
        function() {
          console.log("changed devoured to", newEaten);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        name: $("#bur").val().trim(),
        devoured: false
      };
  
      // Send the POST request.
      $.ajax("/burgers/create", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    })
    });