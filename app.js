// Wait until the document (HTML) is fully loaded before executing the code
$(document).ready(function() {
    
    // Initialize the repeater on elements with the class 'repeater'
    $('.repeater').repeater({
        
        // Option to determine if the repeater starts with empty inputs
        initEmpty: false, // This means the repeater will not start empty
        
        // Define default values for the inputs in the repeater
        defaultValues: {
            'text-input': '' // Sets default text input as an empty string
        },
        
        // Function to show a new repeated item when added to the list
        show: function() {
            $(this).slideDown(); // Uses a slide-down animation to display the item
        },
        
        // Function to hide and delete an item when the delete button is pressed
        hide: function(deleteElement) {
            $(this).slideUp(deleteElement); // Uses a slide-up animation to hide the item
            
            // After a short delay (500 milliseconds), the 'generateCV' function is called
            setTimeout(() => {
                generateCV(); // This is presumably a function that updates the CV
            }, 500);
        },
        
        // Option to prevent the first item in the list from being deleted
        isFirstItemUndeletable: true // Ensures the first input item cannot be deleted
    });
});
