
// Grab HTML form element to be used to update stock order info
let updateOrderForm = document.getElementById('update-order-form');

// Form will pass stock order attributes: ticker, quantity, price, total, type 
updateOrderForm.addEventListener("submit", function (element) {
    element.preventDefault();

    // Get form fields we need to fetch employee info from
    let inputOrderNum = document.getElementById("drop-update-order");
    let inputTicker = document.getElementById("drop-update-ticker");
    let inputVendor = document.getElementById("drop-update-vendor");
    let inputQuantity = document.getElementById("updateQuantity");
    let inputPrice = document.getElementById("updatePrice");
    let inputTotal = document.getElementById("updateTotal");
    let inputType = document.getElementById("updateType");

    // Get the values from the form fields and assign to variables
    // Values will be used by JS object to which they are assigned
    let orderNumValue = inputOrderNum.value;
    let tickerValue = inputTicker.value; 
    let vendorValue = inputVendor.value;
    let inputQuantityValue = inputQuantity.value; 
    let inputPriceValue = inputPrice.value; 
    let inputTotalValue = inputTotal.value; 
    let inputTypeValue = inputType.value; 

    // Create a JS object to submit in our AJAX request containing above values
    let data = {
        order_num: orderNumValue,
        ticker: tickerValue, 
        vendor: vendorValue,
        quantity: inputQuantityValue, 
        price: inputPriceValue,
        total: inputTotalValue,
        type: inputTypeValue
    }

    // Setup AJAX request. Pass data containing values to be added to table 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-stock-order", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // location.reload() function to be executed when ready state changes 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Reload page to display newly updated data 
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Wrong input was entered")
        }
    }
    // Submit our request as a JSON string
    xhttp.send(JSON.stringify(data));
})
