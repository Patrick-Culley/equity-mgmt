// Citation Scope: Deleting rows data from html table 
// Date: 3/9/2023
// Originality: Copied from Part A, Step 7 of node starter app module. Changed function name: deleteBlotter(). 
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

// deleteBlotter function deletes a blotter report row 
// Passes the blotterID
function deleteBlotter(blotterID) {
    let link = '/delete-blotter-ajax/';
    let data = {
      blotter_id: blotterID
    };
    // Request header info 
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(blotterID);
      }
    });
  }
  // function deletes row using the Blotter report ID 
  function deleteRow(blotterID){
      // Grab table elment to iterate over to delete row 
      let table = document.getElementById("blotter-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         // if data value matches blotter ID then delete row
         if (table.rows[i].getAttribute("data-value") == blotterID) {
              table.deleteRow(i);
              break;
         }
      }
  }