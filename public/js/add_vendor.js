// Citation Scope: Gathering data from form and adding new data rows to html table 
// Date: 3/9/2023
// Originality: Adapted using different element ids, field numbers, & variable names 
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Grab HTML form element to be used to submit vendor info
let addvendorForm = document.getElementById('add-vendor-form-ajax');
// Add event listener to submit button to pass values when button is pressed 
addvendorForm.addEventListener("submit", function (element) {
    element.preventDefault();
    // Obtain form elements containing the cell values
    let inputVendorName = document.getElementById("input-vendor_name-ajax");
    let inputWebsite = document.getElementById("input-website-ajax");
    let inputPhone = document.getElementById("input-phone-ajax");
    // Obtain cell values from form fields
    let vendorNameValue = inputVendorName.value;
    let websiteValue = inputWebsite.value;
    let phoneValue = inputPhone.value;
    // JS object to be sent, contains cell values from above
    let data = {
        vendor_name: vendorNameValue,
        website: websiteValue,
        phone: phoneValue,    
    }
    
    // Begin our AJAX request. Contains addRowToTable() function to add new row 
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-vendor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload()
            // Delete out data from form fields for next entry 
            inputVendorName.value = '';
            inputWebsite.value = '';
            inputPhone.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Invalid input - try again")
        }
    }
    // Send request as JSON string
    xhttp.send(JSON.stringify(data));
})

// Populate Table with newly created row 
addRowToTable = (data) => {
    // Grab Table element  
    let currentTable = document.getElementById("vendor-table");
    // Find location of the last row to find where to append new row
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells. Contains Delete. 
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let vendorNameCell = document.createElement("TD");
    let websiteCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Inputs newly insert data into inner text of cells
    idCell.innerText = newRow.vendor_id;
    vendorNameCell.innerText = newRow.vendor_name;
    websiteCell.innerText = newRow.website;
    phoneCell.innerText = newRow.phone;
    // Delete button created:
    // Uses deletevendor() function contained in delete_vendor.js
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletevendor(newRow.vendor_id);
    };
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(vendorNameCell);
    row.appendChild(websiteCell);
    row.appendChild(phoneCell);
    row.appendChild(deleteCell);
    row.setAttribute('data-value', newRow.vendor_id);
    // Add the row to table
    currentTable.appendChild(row);
}