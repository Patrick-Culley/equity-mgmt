
// Grab HTML form element to be used to submit stock info
let addStockForm = document.getElementById("add-stock-form") 
// Add event listener to submit button to pass values when button is pressed 
addStockForm.addEventListener("submit", function(element){
    element.preventDefault () 
    // Obtain form elements containing the cell values
    let inputTicker = document.getElementById("ticker")
    let inputCompany = document.getElementById("company")
    let inputExchange  = document.getElementById("exchange")
    let inputPrice = document.getElementById("price")
    let inputDate = document.getElementById("date")
    // Obtain cell values from form fields
    let tickerValue = inputTicker.value; 
    let companyValue = inputCompany.value; 
    let exchangeValue = inputExchange.value; 
    let priceValue = inputPrice.value; 
    let dateValue = inputDate.value; 

    // JS object to be sent, contains cell values from above
    let data = {
        ticker: tickerValue,
        company: companyValue, 
        exchange: exchangeValue, 
        price: priceValue,
        date: dateValue
    } 
    
    // Begin our AJAX request. Includes addRowToTable() function 
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-stock-to-stocks", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
            // Reload page to display newly inserted data
            location.reload()
            // Delete out data from form fields for next entry 
            inputTicker.value = '';
            inputCompany.value = '';
            inputExchange.value = '';
            inputPrice.value = '';
            inputDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Invalid input - try again")
        }
    }
    // Send request as JSON string
    xhttp.send(JSON.stringify(data));
})

// Populate Table with newly added row 
addRowToTable = (data) => {
    // Grab Table element  
    let stockTable = document.getElementById('stocks-table')
    // Find location of the last row 
    let newRowIndex = stockTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells. Last cell is Delete.
    let row = document.createElement("TR")
    let tickerCell = document.createElement("TD")
    let companyCell = document.createElement("TD")
    let exchangeCell = document.createElement("TD")
    let priceCell = document.createElement("TD")
    let dateCell = document.createElement("TD")
    let deleteCell = document.createElement("TD")

    // Inputs newly insert data into inner text of cells
    tickerCell.innerText = newRow.ticker; 
    companyCell.innerText = newRow.company; 
    exchangeCell.innerText = newRow.exchange; 
    priceCell.innerText = newRow.price;
    dateCell.innerText = newRow.date; 
    // Delete button created:
    // Uses deleteStock() function contained in delete_stock_from_stocks.js
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteStock(newRow.vendor_id);
    };
    // Append the child cells to the row 
    row.appendChild(tickerCell);
    row.appendChild(companyCell);
    row.appendChild(exchangeCell);
    row.appendChild(priceCell);
    row.appendChild(dateCell);
    row.appendChild(deleteCell);
    row.setAttribute('data-value', newRow.ticker);
    // Add row to table
    stockTable.appendChild(row);
}