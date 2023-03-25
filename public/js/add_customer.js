// Citation Scope: Gather data from form and adding rows to html table 
// Date: 3/9/2023
// Originality: Adapted using different element ids, field numbers, & variable names 
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get form element 
let addPersonForm = document.getElementById('add-customer');

// Add event listener to submit button 
addPersonForm.addEventListener("submit", function (element) {
    element.preventDefault();
    // Obtain form element inputs 
    let inputFirstName = document.getElementById("fname");
    let inputLastName = document.getElementById("lname");
    let inputEmail = document.getElementById("email");
    let inputAddress = document.getElementById("address");
    let inputBalance = document.getElementById("balance");

    // Obtain values from input
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let addressNameValue = inputAddress.value;
    let balanceNameValue = inputBalance.value; 

    // JS object to be sent 
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        address: addressNameValue,
        balance: balanceNameValue
    }
    // AJAX request to submit 
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.response)
            // Add row to table and clear form fields
            addRowToTable(xhttp.response);

            // Clear out cell values to start fresh
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputAddress.value = '';
            inputBalance.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Invalid input - try again")
        }
    }
    // Submit request 
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {
    // obtain the table element 
    let currentTable = document.getElementById("people-table");

    // Fetch location of the last row in which to append cell
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    // Create new elements to append to the row 
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let balanceCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Setup delete button to new row, uses deletePerson() function contained in delete_customer.js
    deleteButton = document.createElement("button"); 
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("id", "button")
    deleteCell.appendChild(deleteButton);
    deleteCell.onclick = function(){
        deletePerson(newRow.cust_id);
    };

    // Fill in cells with data 
    idCell.innerText = newRow.cust_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    emailCell.innerText = newRow.email;
    addressCell.innerText = newRow.address;
    balanceCell.innerText = newRow.balance;

    // Add all new cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(addressCell);
    row.appendChild(balanceCell);
    row.appendChild(deleteCell); 

    row.setAttribute('data-value', newRow.cust_id);

    // Add the row to the table
    currentTable.appendChild(row);
    // Update dropdown menu with newly added data
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.first_name + ' ' +  newRow.last_name;
    option.value = newRow.cust_id;
    selectMenu.add(option);
}