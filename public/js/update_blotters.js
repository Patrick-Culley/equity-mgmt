/*
Citation Scope: Updating from html form and updating table using Javascript & AJAX 
Date 3/9/2023
Originality: Adapted from Step 8. Removed updateRow() function and uses different element ids, field numbers, & variable names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
// Grab HTML form element to be used to update blotter report
let updateOrderForm = document.getElementById('update-blotter-form');

// Form will pass report attributes including settle date, trade type, fees, and net proceeds 
updateOrderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Get form fields we need to update the report
    let inputReportID = document.getElementById("test1");
    let inputSettle = document.getElementById("updateSettle");
    let inputType = document.getElementById("updateType");
    let inputFees = document.getElementById("updateFees");
    let inputProceed = document.getElementById("updateProceed");
    
    // Get the values from the form fields above and assign to variables
    // Values will be used by JS 'data' object to which they are assigned  
    let reportIDValue = inputReportID.value;
    let inputSettleValue = inputSettle.value; 
    let inputTypeValue = inputType.value; 
    let inputFeesValue = inputFees.value; 
    let inputProceedValue = inputProceed.value; 
    // Create the JS object to submit in our AJAX request containing the form values
    let data = {
        report_id: reportIDValue,
        settle_date: inputSettleValue, 
        trade_type: inputTypeValue, 
        fees: inputFeesValue,
        net_proceed: inputProceedValue,
    };

    // Setup AJAX request. 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-blotters", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // On state change reload page to display newly updated data
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Reload page to display newly updated data 
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Input incorrect - try again", data, xhttp)
        }
    }
    // Submit our request as a JSON string
    xhttp.send(JSON.stringify(data));
})