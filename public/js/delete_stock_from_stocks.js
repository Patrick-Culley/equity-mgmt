// Citation Scope: Deleting rows to html table 
// Date: 3/9/2023
// Originality: Copied from Part B, Step 7 of node starter app module. Changed attribute and function name. Function is now deleteStock(). 
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

// deleteStock function deletes a Stock row 
// Passed the ticker symbol to identify row
function deleteStock(ticker) {
    // JS object to be sent contains the ticker symbol 
    let data = {
        ticker_symbol: ticker
    };

    // Initialize the AJAX request 
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-stock-from-stocks", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // On state change, call deleteRow to remove row from table 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            console.log(data)
            // Delete the data to the table
            deleteRow(ticker);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("Invalid input - try again!")
        }
    }
    // Send the request as a JSON string 
    xhttp.send(JSON.stringify(data));
}
// function deletes row using ticker symbol  
function deleteRow(ticker){
    // Grab table elment to iterate over to delete row 
    let table = document.getElementById("stocks-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // if data value matches tickey symbol then delete row
       if (table.rows[i].getAttribute("data-value") == ticker) {
            table.deleteRow(i);
            break;
       }
    }
}