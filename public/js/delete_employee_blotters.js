// Citation Scope: Deleting rows data from html table 
// Date: 3/9/2023
// Originality: Copied from Part A, Step 7 of node starter app module. Changed function name: deleteEmployeeBlotter(). 
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

// function deletes blotter assignments from EmployeesHasBlotters 
function deleteEmployeeBlotter(employee_report_id) {
    let link = '/deleteEmployeeBlotter/';
    // JS object to be sent contains the employee report ID
    let data = {
      employee_report_id: employee_report_id
    };
    // Request header info
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        // Upon success call deleteRow() function to delete row from table
        deleteRow(employee_report_id);
      }
    });
  }
  // function deletes row using the employee report ID to which an employee is assigned
  function deleteRow(employee_report_id){
      // Grab table elment to iterate over to delete row 
      let table = document.getElementById("employee-blotter-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
        // if data value matches employee report ID then delete row
         if (table.rows[i].getAttribute("data-value") == employee_report_id) {
              table.deleteRow(i);
              break;
         }
      }
  }