//Code adapted from cs340 nodejs-starter-app: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify

let updateEmployeeBlotterForm = document.getElementById('update-employee_blotter-form');

// Modify the objects we need
updateEmployeeBlotterForm.addEventListener("submit", function (element) {
   
    // Prevent the form from submitting
    element.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeReportId = document.getElementById("update-employee_report_id")
    let inputEmployeeId= document.getElementById("update-employee_id");


    // Get the values from the form fields
    let employeeReportIdValue = inputEmployeeReportId.value;
    let employeeIdValue = inputEmployeeId.value;
    

    // Put our data we want to send in a javascript object
    let data = { 
        blotter_report_id: employeeReportIdValue,
        employee_id: employeeIdValue,
    }

    // Setup AJAX request. Pass data containing values to be added to table 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateEmployeeBlotter", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // location.reload() function to be executed when ready state changes 
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Reload page to display newly updated data 
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Wrong input was entered")
        }
    }
    // Submit our request 
    xhttp.send(JSON.stringify(data));
})