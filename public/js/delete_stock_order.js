
// deletestockorder function deletes a Stock order row 
// Passed the order number to identify and delete row
function deletestockorder(order_num) {
    // JS object to be sent contains the order number  
    let data = {
        order: order_num
    };
    // Initialize the AJAX request 
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-stock-order", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // On state change, call deleteRow to remove row from table 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            console.log(data)
            // Delete the data to the table
            deleteRow(order_num);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request as a JSON string 
    xhttp.send(JSON.stringify(data));
}
// function deletes stock order row using order number   
function deleteRow(order_num){
    // Grab table elment to iterate over to delete row 
    let table = document.getElementById("stock-orders-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // if data value matches order number then delete row
       if (table.rows[i].getAttribute("data-value") == order_num) {
            table.deleteRow(i);
            break;
       }
    }
}