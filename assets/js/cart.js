
$(document).ready(function () {
           function addThousandSeparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}            

       function removeThousandSeparator(formattedNumber) {
    return formattedNumber.replace(/,/g, '');
}


 $(".add-to-cart").on("click", function () {
            var productId = $(this).data("product-id");
            // Extract other product details as needed

            // Send the product details to the server
            $.ajax({
                method: "POST",
                url: "add_to_cart.php", // Replace with your actual server endpoint
                data: { productId: productId, /* add more product details here */ },
                 beforeSend:function(){
      },
                success: function (response) {
                           var jsonData = JSON.parse(response);
                           alert(jsonData.message);

var ProductPrice = addThousandSeparator(jsonData.ProductPrice);

    var listItem = '<div class="list-group-item list-group-item-action" aria-current="true">' +
        '<div class="d-flex">' +
        '<button class="trash btn btn-default" data-cart-id="' + jsonData.CartID + '"><i class="far fa-times-circle"></i></button>' +
        '<div>' +
        '<div class="d-flex w-100">' +
        '<h5 class="">' + jsonData.ProductName + '</h5>' +
        '<img style="max-height:40px;min-height:40px;" class="ms-auto" src="/assets/uploaded_img/' + jsonData.ProductImg + '">' +
        '</div>' +
        '<p class="mb-1"><span class="quantity">' + jsonData.Quantity + '</span> x TZS <span class="price">' + ProductPrice + '</span></p>' +
        '</div>' +
        '</div>' +
        '</div>';

        var total_cost_cart_options = '<div id="total_cost_cart_options">' +
        '<h5 style="font-weight:bold;" class="mt-1 text-start">Total: TZS <span id="total_cost"></span></h5>' +
        '<a href="/cart.php" style="border:1px solid #000;" class="mt-2 mb-2 btn btn-default w-100">View Cart</a>' +
        '<a href="/checkout.php" class="btn btn-default w-100 bg-dark text-white">Checkout</a>' +
        '</div>' +
        '</div>';


   var product_list = $('#product_list');
    
    if (product_list.length > 0) {
        // #product_list exists, append the list item
        product_list.append(listItem);
    } else {
        // #product_list doesn't exist, create it and append the list item
        var product_list_container = $('<div id="product_list" class="list-group"></div>');
         $('#product_list_empty').remove();
         product_list_container.append(listItem);
         $('#cart_items_sidebar').append(product_list_container);
         $('#cart_items_sidebar').append(total_cost_cart_options);
       }


var listItems = $('#product_list').find('.list-group-item');
var totalCost = 0;

listItems.each(function(idx, li) {
    var quantity = parseFloat($(li).find(".quantity").text().trim());
    var price = removeThousandSeparator($(li).find(".price").text().trim());
var price = parseFloat(price);


if (!isNaN(quantity) && !isNaN(price)) {
        // Calculate the subtotal for the current product
        var subtotal = quantity * price;

        // Add the subtotal to the total cost
        totalCost += subtotal;

    }
});
var totalPrice = addThousandSeparator(totalCost);
$('#total_cost').html(totalPrice);


},
                 error: function (jqXHR, exception) {
           var msg = '';
         if (jqXHR.status === 0) {msg = 'Not connect.\n Verify Network.'; } else if (jqXHR.status == 404) { msg = 'Requested page not found [404].';}
         else if (jqXHR.status == 500) {msg = 'Internal Server Error [500].';} else if (exception === 'parsererror') { msg = 'Requested JSON parse failed.';} 
         else if (exception === 'timeout') { msg = 'Time out error.'; } else if (exception === 'abort') { msg = 'Ajax request aborted.'; } 
         else { msg = 'Uncaught Error.\n' + jqXHR.responseText; }
            alert(msg);

    } 
            });
        });
   


    // Attach a click event handler to the trash buttons
    $(document).on("click", ".trash", function() {
        // Get the CartID from the data attribute
        var listItem = $(this).closest(".list-group-item");
        var cartID = $(this).data("cart-id");

        // Send an Ajax request to delete the item
        $.ajax({
            url: "remove_item.php", // Replace with the actual URL
            method: "POST",
            data: { cartID: cartID }, // Send the CartID to the PHP file
            beforeSend: function() {
                console.log(cartID);
            },
            success: function(response) {
                // Handle the response from the server (e.g., remove the item from the UI)
                if (response === "success") {
                    // Remove the item from the UI
                    listItem.remove();
                    
                    // Check if there are no items left
                    var product_list = $('#product_list');
                    if (product_list.children().length === 0) {
                        product_list.remove();
                        $('#total_cost_cart_options').remove();
                         var product_list_container_empty = $('<div id="product_list_empty">Your cart is empty.</div>');
                         $('#cart_items_sidebar').append(product_list_container_empty);
                    }


                    var listItems = $('#product_list').find('.list-group-item');
var totalCost = 0;

listItems.each(function(idx, li) {
    var quantity = parseFloat($(li).find(".quantity").text().trim());
    var price = removeThousandSeparator($(li).find(".price").text().trim());
       var price = parseFloat(price);

    if (!isNaN(quantity) && !isNaN(price)) {
        // Calculate the subtotal for the current product
           
        var subtotal = quantity * price;

        // Add the subtotal to the total cost
        totalCost += subtotal;

    
    }
});

var totalPrice = addThousandSeparator(totalCost);
$('#total_cost').html(totalPrice);


                } else {
                    // Handle any errors or display a message
                    alert("Failed to delete the item.");
                }
            }
        });
    });
});
