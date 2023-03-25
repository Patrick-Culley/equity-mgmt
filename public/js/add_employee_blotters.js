// Citation Scope: Gathering data from form and adding rows to html table 
// Date: 3/9/2023
// Originality: Adapted using different element ids, field numbers, & variable names 
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Grab HTML form element to be used to submit stock info
let addemployeeForm = document.getElementById('add-employee_blotter-form');

// Add event listener to submit button to pass values when button is pressed 
addemployeeForm.addEventListener("submit", function (element) {
    element.preventDefault();
    // Obtain form elements containing the report and employee ID 
    let inputreport_id = document.getElementById("add-report_id");
    let inputemployee_id = document.getElementById("add-employee_id");

    // Get the stock report id and employee id values from the form fields
    let report_idValue = inputreport_id.value;
    let employee_idValue = inputemployee_id.value;

    // JS object to be sent, contains cell values from above
    let data = {
        report_id: report_idValue,
        employee_id: employee_idValue,
    }
    
    // Begin AJAX request 
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employees_blotters", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    // On state change, call addRowToTable to add new row from table 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // function appends a child row to the table
            addRowToTable(xhttp.response);
            // refresh to display newly updated values 
            document.location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Invalid input! Try again")
        }
    }
    // Send the request as a JSON string 
    xhttp.send(JSON.stringify(data));
})

// Function adds newly created row to the table 
addRowToTable = (data) => {
    // Grab table element to be added to 
    let currentTable = document.getElementById("employee-blotter-table");
    // Finds last location of row in orde to insert child row 
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let reportidCell = document.createElement("TD");
    let employeeidnameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");
    // add delete button to cell with deleteemployee() function 
    deleteButton = document.createElement("button"); 
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("id", "button")
    deleteCell.appendChild(deleteButton);
    deleteCell.onclick = function(){
        deleteemployee(newRow.employee_report_id);
    };
}