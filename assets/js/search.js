
$(document).ready(function() {
    // Using event delegation to handle dynamically added elements
    $('.main_categories').on('click', '.main_category_item', function() {
        var selectedCategory = $(this).text();
        
        // Remove the "active" class from all dropdown items
        $('.main_category_item').removeClass('active');
        
        // Add the "active" class to the clicked dropdown item
        $(this).addClass('active');
        
        if ($(this).hasClass('default')) {
            $('input[name="userSearchInput"]').attr('placeholder', 'Search in All Categories');
             $('#mainCategoryInput').val('');
        } else {
            $('input[name="userSearchInput"]').attr('placeholder', 'Search in ' + selectedCategory);
            $('#mainCategoryInput').val(selectedCategory);
        }
        
        if ($('.main_category_item.default').length === 0) {
            $('.main_categories').append('<li><a class="main_category_item default dropdown-item">All Categories</a></li>');
        }
    });
});
