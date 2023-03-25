// Citation Scope: Deleting rows data from html table 
// Date: 3/9/2023
// Originality: Copied from Part A, Step 7 of node starter app module. 
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

// function deletes customer from Customer table 
function deletePerson(personID) {
    // JS object to be sent contains the customer id 
    let data = {
        id: personID
    };
    // Initialize the AJAX request 
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // On state change, call deleteRow to remove row from table 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // pass the customer ID to locate the row to be deleted
            deleteRow(personID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("Invalid input - try again!")
        }
    }
    // Send the request as a JSON string 
    xhttp.send(JSON.stringify(data));
}
// function deletes row using the customerID 
function deleteRow(personID){
    // Grab table elment to iterate over to delete row 
    let table = document.getElementById("people-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       // if data value matches customer ID then delete row
       if (table.rows[i].getAttribute("data-value") == personID) {
            table.deleteRow(i);
            location.reload()
       }
    }
}