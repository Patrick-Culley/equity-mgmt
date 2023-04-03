// Grab HTML form element to be used to submit blotter info
let addblotterForm = document.getElementById('add-blotter-form-ajax');
// Add event listener to submit button
addblotterForm.addEventListener("submit", function (element) {
    element.preventDefault();

    // Obtain form elements used to gather cell values
    let inputOrder = document.getElementById("mySelect");
    let inputSettlement = document.getElementById("input-settlement-ajax");
    let inputTradeType = document.getElementById("input-trade_type-ajax");
    let inputFees = document.getElementById("input-fees-ajax");
    let inputNetProceed = document.getElementById("input-net_proceed-ajax");
    
    // Obtain cell values 
    let orderNumValue = inputOrder.value;
    let settleDateValue = inputSettlement.value;
    let tradeTypeValue = inputTradeType.value;
    let feesValue = inputFees.value;
    let netProceedValue = inputNetProceed.value;

    // JS object to be sent, contains cell values from above
    let data = {
        order_num: orderNumValue,
        settle_date: settleDateValue,
        trade_type: tradeTypeValue,
        fees: feesValue,
        net_proceed: netProceedValue
    }
    
    // AJAX request 
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-blotter", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
            // reload page to display newly added data
            location.reload()
            // clear out form fields - ready for new input 
            inputSettlement.value = '';
            inputTradeType.value = '';
            inputFees.value = '';
            inputNetProceed.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Invalid input - try again")
        }
    }
    // Submit request 
    xhttp.send(JSON.stringify(data));
})

// Creates a row containing the new object 
addRowToTable = (data) => {
    // Obtain the table element 
    let currentTable = document.getElementById("blotter-table");
    // Fetch location of where to input row 
    let newRowIndex = currentTable.rows.length;
    // New row data
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create rows with 7 cells 
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orderNumCell = document.createElement("TD");
    let settleDateCell = document.createElement("TD");
    let tradeTypeCell = document.createElement("TD");
    let feesCell = document.createElement("TD");
    let netProceedCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Change inner text of cells
    idCell.innerText = newRow.report_id;
    orderNumCell.innerText = newRow.order_num;
    settleDateCell.innerText = newRow.settle_date;
    tradeTypeCell.innerText = newRow.trade_type;
    feesCell.innerText = newRow.fees;
    netProceedCell.innerText = newRow.net_proceed;
    // Delete cell is updated using the deleteBlotter() function contained in delete_blotter.js
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteBlotter(newRow.blotter_id);
    };

    // Append the child cells to the row 
    row.appendChild(idCell);
    row.appendChild(orderNumCell);
    row.appendChild(settleDateCell);
    row.appendChild(tradeTypeCell);
    row.appendChild(feesCell);
    row.appendChild(netProceedCell);
    row.appendChild(deleteCell);
    
    row.setAttribute('data-value', newRow.blotter_id);
    // Add row to table
    currentTable.appendChild(row);
}