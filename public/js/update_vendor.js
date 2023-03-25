/*
Citation Scope: Updating from html form and updating table using Javascript & AJAX 
Date 3/9/2023
Originality: Adapted from Step 8. Uses different element ids, field numbers, & variable names. Uses location.reload()
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

// Grab HTML form element to be used to update individual stock info
let updatevendorForm = document.getElementById('update-vendor-form-ajax');

// Form will pass vendor attributes: id, name, website, and phone
updatevendorForm.addEventListener("submit", function (element) {
       element.preventDefault();

    // function updatevendor(vendor_id, first_name, last_name, last_update)
    // Get form fields we need to get data from
    let inputMySelect = document.getElementById("mySelect")
    let inputVendorName = document.getElementById("input-vendor_name-update");
    let inputWebsite = document.getElementById("input-website-update");
    let inputPhone = document.getElementById("input-phone-update");

    // Get the values from the form fields
    let vendor_id = inputMySelect.value;
    let vendorNameValue = inputVendorName.value;
    let websiteValue = inputWebsite.value;
    let phoneValue = inputPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
        vendor_id: vendor_id,
        vendor_name: vendorNameValue,
        website: websiteValue,
        phone: phoneValue,

    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-vendor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Reload page to display newly updated data 
            location.reload() 
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request as a JSON string
    xhttp.send(JSON.stringify(data));
});
// Updates table row with newly sent data 
function updateRow(data, vendor_id){
    let parsedData = JSON.parse(data);
    // Grab table element to update vendor fields 
    let table = document.getElementById("vendor-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == vendor_id) {
            // Get the location of the row where we found the matching vendor ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of vendor value
            let td = updateRowIndex.getElementsByTagName("td")[0];
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            
            // Reassign vendor to our value we updated to
            td.innerHTML = parsedData[0].vendor_id; 
            td1.innerHTML = parsedData[0].vendor_name;
            td2.innerHTML = parsedData[0].website;
            td3.innerHTML = parsedData[0].phone;
        }
    }
}