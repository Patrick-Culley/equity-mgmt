
// Grab HTML form element to be used to update individual stock info
let stockForm = document.getElementById("update-stock-form")

// Form will pass stock attributes: ticker, price, and date
stockForm.addEventListener("submit", function(element){
    element.preventDefault()
    
    // Get form fields we need to fetch stock info from
    let inputTicker = document.getElementById("dropdown-ticker") 
    let inputPrice = document.getElementById("update-price")
    let inputDate = document.getElementById("update-date")

    // Get the values from the form fields and assign to variables
    // Values will be used by JS object to which they are assigned
    let tickerValue = inputTicker.value
    let priceValue = inputPrice.value 
    let dateValue = inputDate.value
    
    // Create a JS object to submit in our AJAX request containing above values
    let data = {
        ticker: tickerValue,
        price: priceValue,
        date: dateValue
    }
    // Begin our AJAX request. Pass data containing values to be added to table 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-stock-from-stocks", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // function to be executed when ready state changes 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Reload page to display newly updated data 
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log(data)
            console.log("Wrong input was entered")
        }
    }
    // Submit our request as a JSON string
    xhttp.send(JSON.stringify(data));
})