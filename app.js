/* 
Citation Scope: Creatuing and executing all queries/operations and routes 
Date: 3/9/2023
Originality: Adapted from all steps found in node-practice-app module. Uses different queries,
              routes, and object/variable names. 
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
Note: Individual citations are included under each route 
*/

// Setup express and AJAX for routing 
// Use Express framework for creating object for routing 
var express = require('express');    
var app = express();             

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
// Listen on port for connections   
PORT = 2466;       

// ------------------ SETUP HANDLEBARS ENGINE ------------------------------------// 
/* 
Citation Scope: Setting up Handlebars engine for templating 
Date: 3/9/2023
Originality: Copied from step 3   
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');      
app.engine('.hbs', engine({extname: ".hbs"}));   
app.set('view engine', '.hbs');                  

// ------------------- SETUP DB CONNECTION ---------------------------------------//
// Establish connection with database credentials stored in db-connector file 
var db = require('./database/db-connector')

// ----------------------- INDEX PAGE --------------------------------------------//
// index.hbs contains links/routes to all pages 
app.get('/', function(req, res)
    {   
        // Index only contains html with links to other routes on the site
        res.render('index', res);
    });

// ----------------------- CUSTOMERS PAGE ----------------------------------------//
/* 
Citation Scope: Dynamically displaying data 
Date: 3/9/2023
Originality: Adapted from step 4 using different table and route name. 
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Use SELECT to query and display all customers from the Customers entity 
app.get('/customers', function(req, res)
    {  
        // Prepare SQL query to be executed on Customers table 
        let query1 = "SELECT * FROM Customers;";       
        // Execute query and return values         
        db.pool.query(query1, function(error, rows, fields){ 
        res.render('customers', {data: rows});               
        })                                                       
    });                                                        

/* 
Citation Scope: Adding new data 
Date: 3/9/2023
Originality: Adapted from step 5 of 'Adding New Data'. Changed query specifics and variable/attribute names
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Uses nested queries - one for INSERT to insert new customer, and one for SELECT to display all Customers after INSERT
app.post('/add-customer', function(req, res) 
{
    // Assign request body to JS object 'data' 
    let data = req.body;
    // Prepare SQL INSERT query to be passed to function 
    query1 = `INSERT INTO Customers (first_name, last_name, email, address, balance) VALUES ('${data.first_name}', '${data.last_name}', '${data.email}', '${data.address}', ${data.balance});`;
    // Execute SQL query on Table 
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            // Verify if error is thrown 
            console.log(error)
            res.sendStatus(400);
        } else {
            // If no error execute 2nd query on Customers 
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    // Verify if error is thrown 
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // If no error, call res.send() on 'rows' object 
                    console.log(rows)
                    res.send(rows);
                }
            })
        }
    })  
});
/* 
Citation Scope: Creating a delete route 
Date: 3/9/2023
Originality: Adapted from step 7 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
// DELETE Customer from Customers table - Uses single DELETE query 
app.delete('/delete-customer/', function(req, res, next)
{
    // Assign request body to JS object 'data' 
    let data = req.body;
    let personID = parseInt(data.id);
    // Prepare SQL query to be passed to db.pool.query() 
    let delete_customer = `DELETE FROM Customers WHERE cust_id = ?`;
    // Execute query on DB 
    db.pool.query(delete_customer, [personID], function(error, rows, fields){
        if(error){
            // Verify if error is thrown 
            res.sendStatus(400); 
        } else {
            // If no error, send back HTTP response code 
            res.sendStatus(204); 
        }
    })
});
/* 
Citation Scope: Creating an update route 
Date: 3/9/2023
Originality: Adapted from step 8 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
// Route to UPDATE Customer --------//
// Update customer address, email, and balance using UPDATE and SELECT on the Customers table 
app.put('/update-customer/', function(req, res, next){
    // Assign request body to 'data' JS object 
    let data = req.body;
    // Gather all values from the request body
    let fullname = parseInt(data.fullname);
    let email = data.email;
    let address = data.address;
    let balance = parseInt(data.balance);

    // Perform UPDATE on Customer using two nested queries to update and select table
    let queryUpdate = `UPDATE Customers SET email = ?, address = ?, balance = ? WHERE Customers.cust_id = ?`;
    db.pool.query(queryUpdate, [email, address, balance, fullname], function(error, rows, fields){
        if (error) {
            // Verify if error is thrown 
            console.log(error);
            res.sendStatus(400);
            }
            else {
                // inner SELECT query called on Customers table 
                query1 = 'SELECT * FROM Customers;'
                db.pool.query(query1, function(error, rows, fields){
                    if (error) {
                        // Verify if error is thrown 
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        // If no error, call res.send() by passing the 'rows' object
                        console.log(rows)
                        res.send(rows);
                    }
                })
            }
    });
    });

// ----------------------- STOCK ORDERS PAGE --------------------------------------------//
/* 
Citation Scope: Dynamically displaying data 
Date: 3/9/2023
Originality: Adapted from step 4 using different table and attribute names and more queries. 
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Route for stock orders - uses 4 queries to obtain the customer, vendor, and stock order data
app.get('/stock-orders', function(req, res, )
    {
        // Prepare four (4) SQL queries to be passed for exectution 
        let query1 = "SELECT * FROM StockOrders;";
        let query2 = "SELECT * FROM Customers;";
        let query3 = "SELECT * FROM VendorBrokers;";
        let query4 = "SELECT * FROM Stocks;"

        // Pass queries to db.pool.query to be executed on StockOrders table 
        db.pool.query(query1, function(error, rows, fields){    
            let order = rows 
            db.pool.query(query2, function(error, rows, fields){
                // Save customers
                let customers = rows;
                db.pool.query(query3, (error, rows, fields) => {
                    // Save vendors
                    let vendors = rows;
                    db.pool.query(query4, function(error, rows, fields){
                        // Save stocks 
                        let stocks = rows;
                        return res.render('stock_orders', {data: order, cust: customers, brokers: vendors, stock: stocks});
                    })
                })
            })
        })
});

/* 
Citation Scope: Adding new data 
Date: 3/9/2023
Originality: Adapted from step 5 of 'Adding New Data'. Changed query specifics and variable/attribute names
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Add to Stock Order - uses nested INSERT and SELECT queries on StockOrders 
app.post('/add-stock-order', function(req, res)
    {
        // Assign request body to JS object 'data' 
        let data = req.body;
        // Prepare SQl statement using values passed from request body
        query1 = `INSERT INTO StockOrders (cust_id, vendor_id, stock_ticker, quantity, unit_price, transaction_total, transaction_type) 
            VALUES (${data.customer}, ${data.vendor}, '${data.ticker}', ${data.quantity}, ${data.unitprice}, ${data.total}, '${data.transaction}')`;
        // Execture SQL query by calling db.pool.query()
        db.pool.query(query1, function(error, rows, fields){
            if (error) {
                // Verify if error is thrown 
                console.log(error)
                res.sendStatus(400);
                res.redirect('back');
            }
            // If no error execute inner query
            else {
                // Select all Stock Orders to display 
                query2 = 'SELECT * FROM StockOrders'
                // Pass select query to db.pool.query for execution 
                db.pool.query(query2, function(error, rows, fields){
                    if (error) {
                        // Verify if error is thrown 
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        // Call res.send() by passing 'rows' object 
                        console.log(rows)
                        res.send(rows);
                    }
                })
            }
        });
})
/* 
Citation Scope: Creating a delete route 
Date: 3/9/2023
Originality: Adapted from step 7 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
// Route to DELETE Stock Order --------//
app.delete('/delete-stock-order', function(req, res, next)
{
    // Assign request body to 'data' JS object 
    let data = req.body;
    let orderID = parseInt(data.order);
    // Assign first query to variable, passed to db.pool.connection() for execution on DB
    let query1 = `DELETE FROM StockOrders WHERE order_num = ?`;

    db.pool.query(query1, [orderID], function(error, rows, fields){
        if (error) {
        // Verify if error is thrown 
        console.log(error);
        res.sendStatus(400);
        }
        else {
            // If no error send back HTTP response code 
            res.sendStatus(204);
        }
    })}
)
/* 
Citation Scope: Creating an update route 
Date: 3/9/2023
Originality: Adapted from step 8 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
// Route to UPDATE Stock Order --------//
// Uses nested queries; one UPDATE and SELECT to display data 
app.put('/update-stock-order/', function(req, res, next){
    // Assign request body to JS 'data' object 
    let data = req.body;
    // Gather all values from the request body 
    let order_num = parseInt(data.order_num);
    let ticker = data.ticker;
    let vendor = parseInt(data.vendor);
    console.log(vendor)
    let quantity = parseInt(data.quantity);
    let price = parseInt(data.price);
    let total = parseInt(data.total);
    let type = data.type;
    
    // Perform actual UPDATE on Customer using two nested queries
    let queryUpdate = `UPDATE StockOrders SET stock_ticker = ?, vendor_id = ?, quantity = ?, unit_price = ?, transaction_total = ?, transaction_type = ? WHERE StockOrders.order_num = ?`;
    db.pool.query(queryUpdate, [ticker, vendor, quantity, price, total, type, order_num], function(error, rows, fields){
        if (error) {
            // Confirm if error is thrown 
            console.error(error)
            res.sendStatus(400);
            }
            else {
                // if no error use SELECT from StckOrders to send back all Customer data to page 
                query1 = 'SELECT * FROM StockOrders;'
                db.pool.query(query1, function(error, rows, fields){
                    if (error) {
                        // Verify if error is thrown 
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        // If no error call res.send() on 'rows' object
                        console.log(rows)
                        res.send(rows);
                    }
                })
            }
    });
});

// ----------------------- BLOTTERS REPORT PAGE --------------------------------------------//
/* 
Citation Scope: Dynamically displaying data 
Date: 3/9/2023
Originality: Adapted from step 4 using different table and attribute names and different queries. 
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Uses nested SELECT queries: Blotters & StockOrders is called 
app.get('/blotters', function(req, res, )
    {
        let query = "SELECT * FROM Blotters;";
        let query1 = "SELECT * FROM StockOrders;";
        db.pool.query(query, function(error, rows, fields){    
            let blotter = rows 
            db.pool.query(query1, function(error, rows, fields){
                // Save order
                let order = rows;    
                console.log(blotter, order)
                return res.render('blotters', {data: blotter, order: order});           
        }) 
})});

/* 
Citation Scope: Adding new data 
Date: 3/9/2023
Originality: Adapted from step 5 of 'Adding New Data'. Changed query specifics and route/variable/attribute names
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Uses nested SELECT and INSERT queries: Blotters entity is only used 
app.post('/add-blotter', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let trade_type = parseInt(data.trade_type);
    if (isNaN(trade_type))
    {
        trade_type = 'NULL'
    }
    query1 = `INSERT INTO Blotters (order_num, settle_date, trade_type, fees, net_proceed) VALUES ('${data.order_num}','${data.settle_date}', '${data.trade_type}', '${data.fees}', '${data.net_proceed}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Verify if error was raised
        if (error) {
            console.log(error)
            res.sendStatus(400);     
            // If no error, exeecute other query 
        } else {  
            query2 = `SELECT Blotters.report_id, Blotters.order_num, Blotters.settle_date, Blotters.trade_type, Blotters.fees, Blotters.net_proceed FROM Blotters;`;
            db.pool.query(query2, function(error, rows, fields){
            // Verify if error was raised
            if (error) {
             // If no error, exeecute with res.send(rows) to send 
                console.log(error);
                res.sendStatus(400);
            } else {
                 res.send(rows);
            }
})}})});

/* 
Citation Scope: Creating a delete route 
Date: 3/9/2023
Originality: Adapted from step 7 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
// Uses DELETE On Blotters entity 
app.delete('/delete-blotter-ajax', function(req,res,next){
    // Capture the request body and assign to JS object 
    let data = req.body;
    let blotterID = parseInt(data.blotter_id);
    //Pass to db.pool.connection to execute on route
    let deleteemployee = `DELETE FROM Blotters WHERE report_id = ?`;

    // Pass blotter ID to identify row to delete
    db.pool.query(deleteemployee, [blotterID], function(error, rows, fields){
        // verify if error is thrown
        if (error) {
        console.log(error);
        res.sendStatus(400);
        } else {
            // send status back if successfull 
            res.sendStatus(204);
        }
    })
});

/* 
Citation Scope: Creating an update route 
Date: 3/9/2023
Originality: Adapted from step 8 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
// Uses UPDATE on Blotters entity-----//
app.put('/update-blotters', function(req, res, next){
// Assign request body to JS object 'data' 
let data = req.body;
// Gather all values from the request body
let report_id = parseInt(data.report_id);
let settle_date = data.settle_date;
let trade_type = data.trade_type;
let fees = parseInt(data.fees);
let net_proceed = parseInt(data.net_proceed);

// Perform actual UPDATE on blotter using two nested queries
let queryUpdate = `UPDATE Blotters SET settle_date = ?, trade_type = ?, fees = ?, net_proceed = ? WHERE Blotters.report_id = ?`;
// Execute queries on DB passing values from the request body 
db.pool.query(queryUpdate, [settle_date, trade_type, fees, net_proceed, report_id], function(error, rows, fields){
    // Verify if error is thrown 
    if (error) {
        console.error(error)
        res.sendStatus(400);
        }
        else {
            // SELECT from Blotters to send back all report id data to page 
            query1 = 'SELECT * FROM Blotters;';
            db.pool.query(query1, function(error, rows, fields){
                if (error) {
                    // Verify if error is thrown 
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // if no error call res.send() on 'rows' 
                    res.send(rows);
                }
            })
        }
});});

// ----------------------- VENDOR BROKERS PAGE --------------------------------------------// 
/* 
Citation Scope: Dynamically displaying data 
Date: 3/9/2023
Originality: Adapted from step 4 using different route, table, and variable names. 
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Uses single SELECT query  
app.get('/vendors', function(req, res)
    {
        let query1 = "SELECT * FROM VendorBrokers;";
        db.pool.query(query1, function(error, rows, fields){     
            res.render('vendors', {data: rows});                   
        })                                                      
});    

/* 
Citation Scope: Adding new data to DB
Date: 3/9/2023
Originality: Adapted from step 5 of 'Adding New Data'. Changed query specifics and route/variable/attribute names
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Uses two nested INSERT and SELECT queries on the VendorBrokers entity 
app.post('/add-vendor-ajax', function(req, res) 
{
    // Create JS object for the request
    let data = req.body;

    // Check if NULL present and assign NULL
    let vendor_name = parseInt(data.vendor_name);
    if (isNaN(vendor_name))
    {
        vendor_name = 'NULL'
    }
    // Create the query and run it on the database
    query1 = `INSERT INTO VendorBrokers (vendor_name, website, phone) VALUES ('${data.vendor_name}', '${data.website}', '${data.phone}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Verify error 
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {  // If no error, select from VendorBrokers to display new data 
            query2 = `SELECT VendorBrokers.vendor_id, VendorBrokers.vendor_name, VendorBrokers.website, VendorBrokers.phone FROM VendorBrokers;`;
            db.pool.query(query2, function(error, rows, fields){
            // Verify if error thrown 
            if (error) {                 
                console.log(error);
                res.sendStatus(400);
                }
                // If no error send object in res.send() 
                else {
                    res.send(rows);
                }
 })}})});

/* 
Citation Scope: Creating a delete route 
Date: 3/9/2023
Originality: Adapted from step 7 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
// Uses single DELETE query on the VendorBrokers entity 
app.delete('/delete-vendor-ajax', function(req,res,next){
       
    let data = req.body;
    let vendorID = parseInt(data.vendor_id);
    // Pass query to db.pool for execution on VendorBrokers table
    let deletevendors = `DELETE FROM VendorBrokers WHERE vendor_id = ?`;
          // Run query 
          db.pool.query(deletevendors, [vendorID], function(error, rows, fields){
              if (error) {
                // Verify if error thrown 
                console.log(error);
                res.sendStatus(400);
              } else {
                // If no error submit HTTP response code
                res.sendStatus(204);
                }
        })
});
/* 
Citation Scope: Creating an update route 
Date: 3/9/2023
Originality: Adapted from step 8 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
// Uses two nested UPDATE and SELECT queries on the VendorBrokers entity 
app.put('/put-vendor-ajax', function(req,res,next){
    // Assign request body to JS object 
    let data = req.body;      
    // Gather values from request body via 'data' object 
    let vendor_id = parseInt(data.vendor_id);
    let vendor_name = data.vendor_name;
    let website = data.website;
    let phone = data.phone;
    // Prepare two (2) nested queries - UPDATE and SELECT called on VendorBrokers table 
    let queryUpdatevendor = `UPDATE VendorBrokers SET vendor_name = "${vendor_name}", website = "${website}", phone = "${phone}" WHERE vendor_id = ?`;
    let showUpdate = `SELECT * FROM VendorBrokers WHERE vendor_id = ?`
            // Run the 1st query
            db.pool.query(
                queryUpdatevendor, [vendor_id, vendor_name, website, phone], 
                function(error, rows, fields){
                if (error) {
                // Verify if error is thrown 
                console.log(error);
                res.sendStatus(400);
                } else {
                // Run the second query
                db.pool.query(showUpdate, [vendor_id], function(error, rows, fields) {
                    if (error) {
                        // Verify if error is thrown 
                        console.log(error);
                        res.sendStatus(400);}
                    else {
                        // send data by calling res.send() on 'rows'
                        res.send(rows);
        }})}    
})});

// --------------------------- STOCKS PAGE -------------------------------------------------------
/* 
Citation Scope: Dynamically displaying data 
Date: 3/9/2023
Originality: Adapted from step 4 using different route, table, and variable names. 
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Uses a single SELECT query on the Stocks entity 
app.get('/stocks', function(req, res)
    {
        // Assign SQL query to variable to be passed to db.pool.connection() for exectution
        let query1 = "SELECT * FROM Stocks;";
        db.pool.query(query1, function(error, rows, fields){   
            let stocks = rows  
            if (error){
                // verify if error is thrown 
                res.sendStatus(400)
            } else {
                // render stocks page
                res.render('stocks', {data: stocks});
            }
        })                 
    }
);
/* 
Citation Scope: Adding new data to DB
Date: 3/9/2023
Originality: Adapted from step 5 of 'Adding New Data'. Changed query specifics and route/variable/attribute names
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Uses two nested INSERT and SELECT queries to add to Stocks entity 
app.post('/add-stock-to-stocks', function(req, res)
    {
        // Assign request body to 'data' JS object 
        let data = req.body
        let query1 = `INSERT INTO Stocks(stock_ticker, company_name, exchange_name, price, as_of_date)
            VALUES('${data.ticker}', '${data.company}', '${data.exchange}', ${data.price}, '${data.date}')`; 
        // Execute SQL queries on table 
        db.pool.query(query1, function(error, rows, fields){
            if (error){
                // Verify if error thrown 
                console.log(error);
                res.sendStatus(400); 
            } else {
                // If no error execute SELECT on Stocks table 
                let query2 = `SELECT * FROM Stocks;`
                db.pool.query(query2, function(error, rows, fields){
                    if(error){
                        // Verify if error throw
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        // If no error call res.send() to send data
                        console.log(rows)
                        res.send(rows)
                    }
                })
            }
        })
    }
)
/* 
Citation Scope: Creating a delete route 
Date: 3/9/2023
Originality: Adapted from step 7 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
// Uses a single DELETE query on the Stocks entity  
app.delete('/delete-stock-from-stocks', function(req, res){
    // Assign request body to JS object 
    let data = req.body;
    let query1 = `DELETE FROM Stocks WHERE stock_ticker = ?`;
    // Execute DELETE query on db.pool.connection
    db.pool.query(query1, [data.ticker_symbol], function(error, row, fields){
        if (error) {
            // Verify if error is thrown   
            res.sendStatus(400);
        }
        else {
            // Delete row and submit back HTTP response code
            res.sendStatus(204);
        }
    })
})
/* 
Citation Scope: Creating an update route 
Date: 3/9/2023
Originality: Adapted from step 8 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
app.put('/update-stock-from-stocks', function(req, res, next){
    // Assign request body to JS object 'data' 
    let data = req.body;
    // Gather all values from the body of the request that require update
    let ticker = data.ticker
    let price = data.price
    let date = data.date
    // Prepare SQL query to be executed 
    let query1 = `UPDATE Stocks SET Stocks.price = ?, Stocks.as_of_date = ? WHERE Stocks.stock_ticker = ?;`
    db.pool.query(query1, [price, date, ticker], function (error, rows, fields){
        if (error){
            // Verify if error is thrown 
            res.sendStatus(400)
        } else {
            // If no error submit by calling res.send() on 'rows'
            console.log(rows)
            res.send(rows)
        }
    })
})

// --------------------------- EMPLOYEES PAGE ---------------------------------------
/* 
Citation Scope: Dynamically displaying data 
Date: 3/9/2023
Originality: Adapted from step 4 using different route, table, attribute, and variable names. 
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
app.get('/employees', function(req, res)
{
    // Declare Query 1 to be assigned below
    let query1;
    // If there is no query perform a basic SELECT
     if (req.query.lname === undefined){
        query1 = `SELECT employee_id, first_name , last_name, last_update, added FROM Employees;`
     }
     else {
        query1 = `SELECT * FROM Employees WHERE last_name LIKE "${req.query.lname}%"`}
        // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        return res.render('employees', {data: rows});
    })
});


app.post('/add-employee-ajax', function(req, res) 
/* 
Citation Scope: Adding new data to DB
Date: 3/9/2023
Originality: Adapted from step 5 of 'Adding New Data'. Changed query specifics and route/variable/attribute names
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
{
    // Assign request body to JS object 
    let data = req.body;

    // Confirm if any NULL values exist
    let first_name = parseInt(data.first_name);
    if (isNaN(first_name))
    {
        first_name = 'NULL'
    }
    let last_name = parseInt(data.last_name);
    if (isNaN(last_name))
    {
        last_name = 'NULL'
    }
    // Create the INSERT query to execute on Employees table 
    query1 = `INSERT INTO Employees (first_name, last_name, last_update, added) VALUES ('${data.first_name}', '${data.last_name}', '${data.last_update}', '${data.added}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Verify if error exists 
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {  // SELECT used on Employees table if no error was returned 
            query2 = `SELECT Employees.employee_id, Employees.first_name, Employees.last_name, Employees.last_update, Employees.added FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){
            // Verify if error is returned
            if (error) {
                console.log(error);
                res.sendStatus(400);
                }
                // If no error send data by calling res.send() on 'rows' 
                else
                {
                    res.send(rows);
                }
            })}})});

/* 
Citation Scope: Creating a delete route 
Date: 3/9/2023
Originality: Adapted from step 7 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
app.delete('/delete-employee-ajax', function(req,res,next){
    // Assign request body to JS object 'data'
    let data = req.body;
    let employeeID = parseInt(data.employee_id);
    // Create query to be called by db.pool.query() 
    let deleteEmployees = `DELETE FROM Employees WHERE employee_id = ?`;

    // Run 1st query on Employees table by using db.pool.query()
    db.pool.query(deleteEmployees, [employeeID], function(error, rows, fields){
        if (error) {
        // Verify if error is thrown 
        console.log(error);
        res.sendStatus(400);
        }
        // If no error execute and submit back HTTP response code
        else {res.sendStatus(204);
    }})
});
/* 
Citation Scope: Creating an update route 
Date: 3/9/2023
Originality: Adapted from step 8 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
app.put('/put-employee-ajax', function(req,res,next){
    // Assign request body containing values to JS object 
    let data = req.body;      
    // Assign values passed onto variables to be used 
    let employee_id = parseInt(data.employee_id);
    let first_name = data.first_name;
    let last_name = data.last_name;
    let last_update = data.last_update;
    // Uses two nested queries including UPDATE and SELECT 
    let queryUpdateEmployee = `UPDATE Employees SET first_name = "${first_name}", last_name = "${last_name}", last_update = "${last_update}" WHERE employee_id = ?`;
    let showUpdate = `SELECT * FROM Employees WHERE employee_id = ?`
    // Execture SQL query on table 
    db.pool.query(
        queryUpdateEmployee, [employee_id, first_name, last_name, last_update], 
        function(error, rows, fields){
        if (error) {
        // Verify if error is thrown 
        console.log(error);
        res.sendStatus(400);
        } else {
        // Run the second query 
        db.pool.query(showUpdate, [employee_id], function(error, rows, fields) {
            if (error) {
                // Verify if error is thrown 
                console.log(error);
                res.sendStatus(400);}
            else {
                // if no error, send data by calling res.send() on rows 
                res.send(rows);
                }})}    
        })});

// --------------------------- EMPLOYEES HAS BLOTTERS TABLE ROUTE ------------------------------------
/* 
Citation Scope: Dynamically displaying data 
Date: 3/9/2023
Originality: Adapted from step 4 using different queryies and route, table, attribute, and variable names. 
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
// Route for EmployeesHasBlotters - uses SELECT to disply all employees
app.get('/employees_blotters', function(req, res)
    {
        let query1 = `SELECT EmployeesHasBlotters.employee_report_id, Blotters.report_id, Employees.first_name, Employees.last_name 
        FROM EmployeesHasBlotters 
        INNER JOIN Blotters ON EmployeesHasBlotters.r_id = Blotters.report_id 
        LEFT JOIN Employees ON EmployeesHasBlotters.emp_id = Employees.employee_id  
        ORDER BY EmployeesHasBlotters.employee_report_id`;
            let query2 = "SELECT * FROM Blotters";
            let query3 = "SELECT * FROM Employees";

            db.pool.query(query1, function(error, rows, fields){    
                let q1 = rows 
                console.log(q1)
                db.pool.query(query2, function(error, rows, fields){
                    // Save report
                    let q2 = rows;
                    db.pool.query(query3, (error, rows, fields) => {
                        // Save employees
                        let q3 = rows;
                        return res.render('employees_blotters', {data: q1, report: q2, employees: q3});
                    })
                })
            })
    });
/* 
Citation Scope: Adding new data to DB
Date: 3/9/2023
Originality: Adapted from step 5 of 'Adding New Data'. Changed query specifics and route/variable/attribute names
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)
*/
app.post('/add-employees_blotters', function(req, res){
    let data = req.body;
    let employee_id = data.employee_id
    // Check for NULLABLE relationship
    if (employee_id == " "){
        employee_id = null
    }
    // Execute INSERT on EmployeesHasBlotters 
    query1 = `INSERT INTO EmployeesHasBlotters (r_id, emp_id) VALUES ('${data.report_id}', ${employee_id})`;
    db.pool.query(query1, function(error, rows, fields){
        // Verify if error is returned 
        if (error) {
            res.sendStatus(400);
        } else {
            // If no error perform SELECT to retun all rows from table. 
            query2 = 'SELECT * FROM EmployeesHasBlotters;';
            db.pool.query(query2, function(error,rows,fields){
                if (error) {
                    res.sendStatus(400);
                } else {
                    // Submit data back by calling res.send() 
                    res.send(rows);
                }
            })
        }
    })
});
/* 
Citation Scope: Creating a delete route 
Date: 3/9/2023
Originality: Adapted from step 7 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
*/
app.delete('/deleteEmployeeBlotter', function(req,res){
    // Assign request body to JS object 'data'
    let data = req.body;
    let employee_report_id = parseInt(data.employee_report_id);
    // Create query to Delete from EmployeesHasBlotters table
    let deleteEmployeeAssignmentQuery = `DELETE FROM EmployeesHasBlotters WHERE employee_report_id = '${employee_report_id}'`;
    // Execute SQL query by calling db.pool.query()
    db.pool.query(deleteEmployeeAssignmentQuery, function(error, rows, fields) {
        if (error) {
            // Verify if error is thrown 
            console.log(error);
            res.sendStatus(400);
        } else {
            // Execute and submit back HTTP response code
            res.sendStatus(204);
        }
    })
});
/* 
Citation Scope: Creating an update route 
Date: 3/9/2023
Originality: Adapted from step 8 using different route, variable, and object names.
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/
app.put('/updateEmployeeBlotter', function(req, res, next){
    // Save request body to JS object to be passed 
    let data = req.body
    // Assign row values to variables 
    let blotter_report_id = data.blotter_report_id
    let employee_id = data.employee_id

    // Check for NULLABLE relationship
    if (employee_id == " "){
        employee_id = null
    }
    // Prepare SQL query to be executed on EmployeesHasBlotters table 
    query1 = "UPDATE EmployeesHasBlotters SET emp_id = ? WHERE employee_report_id = ?;"
    db.pool.query(query1, [employee_id, blotter_report_id], function (error, rows, fields){
        if(error){
            // verify if error is thrown 
            res.sendStatus(400)
        }  else {
            // if no error pass data back in res.send()
            console.log(rows)
            res.send(rows)
        }
    })
})

// Listen on PORT for incoming connections 
app.listen(PORT, function(){ 
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});