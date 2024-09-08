"use strict";
// Assuming you have jQuery and the Repeater plugin types available
$(document).ready(function () {
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            $(this).slideUp(function () {
                deleteElement();
            });
            setTimeout(function () {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});
// // Example function to generate CV (to avoid any errors)
// function generateCV(): void {
//     // CV generation logic here
// }
