/*
Citation Scope: Gathering data from form and updating table using Javascript & AJAX 
Date 3/9/2023
Originality: Adapted from step 8 using different element ids, fields numbers, & variable names. Uses location.reload().
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
// Grab HTML form element to be used to submit employee info
let updateemployeeForm = document.getElementById('update-employee-form-ajax');

// Add event handler when 'submit' is pressed and gathers data
// Includes first and last name, last update, and date added
updateemployeeForm.addEventListener("submit", function (element) {
    element.preventDefault();

    // Get form fields we need to fetch employee info from
    let inputMySelect = document.getElementById("mySelect");
    let inputFirstName = document.getElementById("input-first_name-update");
    let inputLastName = document.getElementById("input-last_name-update");
    let inputUpdate = document.getElementById("input-last_update-update");

    // Get the values from the form fields and assign to variables
    // Values will be used by JS object to which they are assigned
    let employee_id = inputMySelect.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let updateValue = inputUpdate.value;

    // Create a JS object to submit in our AJAX request containing above values
    let data = {
        employee_id: employee_id,
        first_name: firstNameValue,
        last_name: lastNameValue,
        last_update: updateValue,
    };
    
    // Setup AJAX request. Pass data containing values to be added to table 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // function to be executed when ready state changes 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Pass response and id to updateRow() function to execute on table 
            updateRow(xhttp.response, employee_id);
            location.reload()
            // Remove input from text boxes, ready for next input 
            inputFirstName.value = '';
            inputLastName.value = '';
            inputUpdate.value = '';
      
        }
        // Log error if exists
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("invalid input - try again")
        }
    }
    // Submit our request as a JSON string
    xhttp.send(JSON.stringify(data));
});
// Updates table row with newly sent data 
function updateRow(data, employee_id){
    let parsedData = JSON.parse(data);
    // Grab table element to update employee fields 
    let table = document.getElementById("employee-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // Loop over table rows to locate row with matching employee ID 
        if (table.rows[i].getAttribute("data-value") == employee_id) {
            // Obtain table elements to assign
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let tableData = updateRowIndex.getElementsByTagName("td")[0];
            // Add data to table cell 
            tableData.innerHTML = parsedData[0].name; 
        }
    }
}