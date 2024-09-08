// Assuming you have jQuery and the Repeater plugin types available
$(document).ready(() => {
    ($('.repeater') as any).repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function(this: HTMLElement) {
            $(this).slideDown();
        },
        hide: function(this: HTMLElement, deleteElement: () => void) {
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