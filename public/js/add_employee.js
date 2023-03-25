// Citation Scope: Gathering data from form and adding rows to html table 
// Date: 3/9/2023
// Originality: Adapted using different element ids, field numbers, & variable names 
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Grab HTML form element to be used to submit employee info
let addemployeeForm = document.getElementById('add-employee-form-ajax');
// Add event listener to submit button to pass values when button is pressed 
addemployeeForm.addEventListener("submit", function (element) {
    element.preventDefault();

    // Obtain form elements containing the cell values
    let inputFirstName = document.getElementById("input-first_name-jax");
    let inputLastName = document.getElementById("input-last_name-jax");
    let inputUpdate = document.getElementById("input-last_update-jax");
    let inputAdded = document.getElementById("input-added-jax");

    // Obtain cell values from form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let UpdateValue = inputUpdate.value;
    let addedValue = inputAdded.value;

    // JS object to be sent, contains cell values from above
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        last_update: UpdateValue,
        added: addedValue
    }
    
    // Being our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
            // reload page to display newly added data
            location.reload()
            // Delete out data from form fields for next entry
            inputFirstName.value = '';
            inputLastName.value = '';
            inputUpdate.value = '';
            inputAdded.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Invalid input - try again")
        }
    }
    // Submit request as a JS string 
    xhttp.send(JSON.stringify(data));
})

// Populate Table with newly added row 
addRowToTable = (data) => {
    // Obtain the table element 
    let currentTable = document.getElementById("employee-table");
    // Find location of the last row used to insert new row
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells. Last cell is Delete.
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let updateCell = document.createElement("TD");
    let addCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Inputs newly insert data into inner text of cells
    idCell.innerText = newRow.employee_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    updateCell.innerText = newRow.last_update;
    addCell.innerText = newRow.added;
    // Delete button created which uses deleteemployee() function contained in delete_employee.js
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteemployee(newRow.employee_id);
    };
    // Append the child cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(updateCell);
    row.appendChild(addCell);
    row.appendChild(deleteCell);
    
    row.setAttribute('data-value', newRow.employee_id);

    // Add row to table
    currentTable.appendChild(row);

    // Grab dropdown menu and change option to include newly inserted data 
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.first_name + ' ' +  newRow.last_name;
    option.value = newRow.employee_id;
    selectMenu.add(option);
}