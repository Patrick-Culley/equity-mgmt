
// Grab HTML form element to be used to submit stock order info
let addStockForm = document.getElementById('input-stock-order');
// Add event listener to submit button to pass values when button is pressed 
addStockForm.addEventListener("submit", function (element) {
    element.preventDefault();
    // Obtain form elements containing the cell values
    let inputCustomer = document.getElementById("dropdown-customer");
    let inputVendor = document.getElementById("dropdown-vendor");
    let inputTicker = document.getElementById("dropdown-ticker");
    let inputQuantity = document.getElementById("quantity");
    let inputUnitPrice= document.getElementById("unitprice");
    let inputTotal = document.getElementById("total");
    let inputTransType = document.getElementById("trans-type");
    // Obtain cell values from form fields
    let customerValue = inputCustomer.value;
    let vendorValue = inputVendor.value;
    let tickerValue = inputTicker.value;
    let quantityValue = inputQuantity.value; 
    let unitpriceValue = inputUnitPrice.value; 
    let totalValue = inputTotal.value; 
    let transtypeValue = inputTransType.value; 

    // JS object to be sent, contains cell values from above
    let data = {
        customer: customerValue,
        vendor: vendorValue,
        ticker: tickerValue, 
        quantity: quantityValue, 
        unitprice: unitpriceValue, 
        total: totalValue, 
        transaction: transtypeValue
    }
    // Being our AJAX Request. Uses addRowToTable() function to add new row
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-stock-order", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Invalid input - try again")
        }
    }
    // Send request as a JSON string
    xhttp.send(JSON.stringify(data));
})

// Populate Table with newly added row 
addRowToTable = (data) => {
    // Grab Table element  
    let currentTable = document.getElementById("stock-orders-table");
    // Find location of the last row used for future insertion 
    let newRowIndex = currentTable.rows.length;
    // Parse data into a JS object and obtain location to insert new row
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 11 cells. Last cell is Delete.
    let row = document.createElement("TR");
    let orderNumCell = document.createElement("TD");
    let custIDCell = document.createElement("TD");
    let vendorIDCell = document.createElement("TD");
    let tickerCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let unitpriceCell = document.createElement("TD");
    let totalCell = document.createElement("TD");
    let transCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");
    let updateCell = document.createElement("TD");
    let update_link = document.createElement('a'); 

    // Set links for last two table columns for DELETE & UPDATE 
    update_link.setAttribute("href", "#"); 
    let updateText = document.createTextNode("Update");
    update_link.appendChild(updateText); 
    updateCell.appendChild(update_link);    // Update 
    // Delete button - uses deletePerson() function appended to cell
    deleteButton = document.createElement("button"); 
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("id", "button")
    deleteCell.appendChild(deleteButton);
    deleteCell.onclick = function(){
        deletePerson(newRow.order_num);
    };

    // Inputs newly insert data into inner text of table cells
    orderNumCell.innerText = newRow.order_num;
    custIDCell.innerText = newRow.cust_id;
    vendorIDCell.innerText = newRow.vendor_id;
    tickerCell.innerText = newRow.stock_ticker;
    quantityCell.innerText = newRow.quantity;
    unitpriceCell.innerText = newRow.unit_price;
    totalCell.innerText = newRow.transaction_total;
    transCell.innerText = newRow.transaction_type;

    // Append the child cells to the row 
    row.appendChild(orderNumCell);
    row.appendChild(custIDCell);
    row.appendChild(vendorIDCell);
    row.appendChild(tickerCell);
    row.appendChild(quantityCell);
    row.appendChild(unitpriceCell);
    row.appendChild(totalCell);
    row.appendChild(transCell);
    row.appendChild(deleteCell); 
    row.setAttribute('data-value', newRow.order_num);

    // Add the row to the table
    currentTable.appendChild(row);
    // reload to see updated values 
    location.reload() 
    // Grab dropdown menu and change option to include newly inserted data 
    let selectMenu = document.getElementById("dropdown-customer");
    let option = document.createElement("option");
    option.text = newRow.first_name + ' ' +  newRow.last_name;
    option.value = newRow.cust_id;
    selectMenu.add(option);
}