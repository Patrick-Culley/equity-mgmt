
// deleteemployee function deletes an employee row 
// Passes the employee ID
function deleteemployee(employeeID) {
    let link = '/delete-employee-ajax/';
    let data = {
      employee_id: employeeID
    };
    // Request header info 
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(employeeID);
        location.reload()
      }
    });
  }
    // function deletes row using the employee ID 
  function deleteRow(employeeID){
      // Grab table element to iterate over rows
      let table = document.getElementById("employee-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         // if data value matches employee ID then delete row
         if (table.rows[i].getAttribute("data-value") == employeeID) {
              table.deleteRow(i);
              break;
         }
      }
  }