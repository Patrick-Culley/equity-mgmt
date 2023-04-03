
// Grab HTML form element to be used to submit customer info
let updateCustomerForm = document.getElementById('update-customer');

// Form will pass customer attributes including email, address, and balance 
updateCustomerForm.addEventListener("submit", function (element) {
    element.preventDefault();

     // Get form fields we need to customer info from
    let inputFullName = document.getElementById("mySelect");
    let inputEmail = document.getElementById("updateEmail");
    let inputAddress = document.getElementById("updateAddress");
    let inputBalance = document.getElementById("updateBalance");

    // Get the values from the form fields and assign to variables
    // Values will be used by JS object to which they are assigned 
    let fullNameValue = inputFullName.value;
    let emailValue = inputEmail.value; 
    let addressValue = inputAddress.value; 
    let balanceValue = inputBalance.value; 
    // Create a JS object to submit in our AJAX request containing above values
    let data = {
        fullname: fullNameValue,
        email: emailValue, 
        address: addressValue, 
        balance: balanceValue
    }
    // Setup AJAX request. Pass data containing values to be added to table 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // function to be executed when ready state changes 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Reload page to display newly updated data 
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Invalid input! Try again.")
        }
    }
    // Submit our request as a JSON string
    xhttp.send(JSON.stringify(data));
})
