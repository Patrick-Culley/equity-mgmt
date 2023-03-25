// Citation Scope: Deleting rows to html table 
// Date: 3/9/2023
// Originality: Copied from Part A, Step 7 of node starter app module. Changed function name: deletevendor(). Uses location.reload()
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

// deletevendor function deletes a vendor row 
// Passes the vendor ID 
function deletevendor(vendorID) {
    let link = '/delete-vendor-ajax/';
    let data = {
      vendor_id: vendorID
    };
    // Request header info 
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(vendorID);
        // reload page after delete to ensure new data is displayed
        location.reload()
      }
    });
  }
  // function deletes row using the vendor ID 
  function deleteRow(vendorID){
      // Grab table element to iterate over rows
      let table = document.getElementById("vendor-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
          // if data value matches vendor ID then delete row
         if (table.rows[i].getAttribute("data-value") == vendorID) {
              table.deleteRow(i);
              break;
         }
      }
  }