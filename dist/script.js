"use strict";
// Assuming you have jQuery and the Repeater plugin types available
$(document).ready(() => {
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement) {
            $(this).slideUp(() => {
                deleteElement();
            });
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});
// // Example function to generate CV (to avoid any errors)
// function generateCV(): void {
//     window.print();
// }
