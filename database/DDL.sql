
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -------------- Customers Table ----------------------
CREATE OR REPLACE TABLE Customers (
    cust_id INT(30) NOT NULL AUTO_INCREMENT,    -- added auto-increment so we aren't manually inputting customer id
    first_name VARCHAR(45) NOT NULL, 
    last_name VARCHAR(45) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    address VARCHAR(255) NOT NULL, 
    balance DECIMAL(19,2) NOT NULL, 
    PRIMARY KEY(cust_id)
);

------------------ INSERT into Customers table -----------
INSERT INTO Customers(first_name, last_name, email, address, balance)
VALUES ('Chris', 'Chuckles', 'haha@gmail.com', '123 comedy ln', 34000),
	('Tommy', 'Innit', 'init@gmail.com', '123 gamesage way', 200000),
    ('Boots', 'McGruff', 'bootstyles@gmail.com', '222 cowby way', 456000),
    ('Kathy', 'Ray', 'sunshine@gmail.com', '222 smiles st', 6000),
    ('Emily', 'Rose', 'e_rose@gmail.com', '1254 eastfield ct', 90000);

-- ------------- Employees Table ----------------------
CREATE OR REPLACE TABLE Employees (
    employee_id INT(30) AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL, 
    last_name VARCHAR(45) NOT NULL,
    last_update VARCHAR(10), 
    added VARCHAR(10),
    PRIMARY KEY (employee_id) 
);

--------------- INSERT into Employees Table ------------
INSERT INTO Employees(first_name, last_name, last_update, added)
VALUES ('Ray', 'Mond','2023-02-08', '2021-10-12'),
	('Sarah', 'Lee', '2023-02-06', '2020-01-01'),
    ('Tommy', 'Innit', '2023-02-06', '2022-08-12'),
    ('Ernest', 'Estes', '2023-02-07', '2021-10-12'),
    ('Michelle', 'Leary', '2023-02-07', '2021-10-12');


-- ------------- VendorBrokers Table ----------------------
CREATE OR REPLACE VendorBrokers (
    vendor_id INT AUTO_INCREMENT NOT NULL,
    vendor_name VARCHAR(45) NOT NULL, 
    website VARCHAR(255), 
    phone VARCHAR(15), 
    PRIMARY KEY(vendor_id)
); 

--------------- INSERT into VendorBrokers -----------------
INSERT INTO VendorBrokers(vendor_name, website, phone)
VALUES ('Charles Schwab', 'www.schwab.com','8002238787'),
	('E-Trade', 'www.us.etrade.com', '8775868898'),
    ('Interactive Brokers', 'www.interactivebrokers.com', '8774422757'),
    ('Fidelity', 'www.fidelity.com', '8004422757'),
    ('TDAmeritrade', 'www.tdameritrade.com', '8774922057');

-- ------------- Stocks Table ----------------------
CREATE OR REPLACE TABLE Stocks (
	stock_ticker VARCHAR(10) NOT NULL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    exchange_name VARCHAR(45) NOT NULL,
	price DECIMAL(19,2) NOT NULL,
    as_of_date VARCHAR(10)
); 

--------------- INSERT into Stocks -------------------
INSERT INTO Stocks (stock_ticker, company_name, exchange_name, price, as_of_date)
VALUES('PLTR', 'Palantir', 'NYSE', 8.25, '2022-02-07'),
    ('JNJ', 'Johnson & Johnson', 'NYSE', 165.25, '2022-02-07'),
    ('MSFT', 'Microsoft', 'NYSE', 234.25, '2022-02-01'),
    ('CRWD', 'CrowdStrike', 'NYSE', 110.25, '2022-02-01'),
    ('PEP', 'PepsiCo', 'NYSE', 71.20, '2022-02-08');

-- ------------- StockOrders Table ----------------------
CREATE OR REPLACE TABLE StockOrders (
	order_num INT(30) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cust_id INT(45) NOT NULL,
    vendor_id INT(45) NOT NULL,
    stock_ticker VARCHAR(10) NOT NULL,
    quantity INT(255) NOT NULL,
    unit_price DECIMAL(19,2) NOT NULL,
    transaction_total DECIMAL(19,2) NOT NULL,
    transaction_type VARCHAR(45) NOT NULL,
    FOREIGN KEY (cust_id) REFERENCES Customers(cust_id) ON DELETE CASCADE,
    FOREIGN KEY (vendor_id) REFERENCES VendorBrokers(vendor_id) ON DELETE CASCADE
);

----------------------------- INSERT into StockOrders ----------------
INSERT INTO StockOrders (cust_id, vendor_id, stock_ticker, quantity, unit_price, transaction_total, transaction_type) 
    VALUES (1, 2, 'PLTR', 20, 8.25, 165.00, 'buy'),
        (2, 1, 'CRWD', 10, 110.25, 1102.50, 'buy'),
        (3, 3, 'MSFT', 1, 234, 234.00, 'buy'),
        (3, 2, 'JNJ', 1, 10, 165.00, 'buy'),
        (4, 5, 'PEP', 20, 71.20, 1424.00, 'buy');


-- ------------- Blotters Table ----------------------
CREATE OR REPLACE TABLE Blotters (
    report_id INT(45) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_num INT NOT NULL, 
    settle_date VARCHAR(10) NOT NULL, 
    trade_type VARCHAR(255) NOT NULL, 
    fees DECIMAL(19,2) NOT NULL, 
    net_proceed DECIMAL(19,2), 
    FOREIGN KEY (order_num) REFERENCES StockOrders(order_num) ON DELETE CASCADE
); 

----------------- INSERT Blotter report ---------------
INSERT INTO Blotters (report_id, order_num, settle_date, trade_type, fees, net_proceed)
VALUES (1, 1, '2022-02-08', 'buy', 3.00, 168.00),
    (2, 2, '2022-02-08', 'buy', 5.5, 1107.55),
    (3, 3, '2022-02-08', 'buy', 3.5, 237.5),
    (4, 4, '2022-02-07', 'buy', 3.00, 168.00),
    (5, 5, '2022-02-07', 'buy', 6.00, 1430.00);
    
    
-- ------------- EmployeesHasBlotters (intersection) Table ----------------------
CREATE OR REPLACE TABLE EmployeesHasBlotters (
    employee_report_id INT(30) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    emp_id INT(30),
    r_id INT(45) NOT NULL,
    FOREIGN KEY (emp_id) REFERENCES Employees(employee_id) ON DELETE CASCADE ON UPDATE SET NULL,
    FOREIGN KEY (r_id) REFERENCES Blotters(report_id) ON DELETE CASCADE
    );

--------------------- INSERT into EmployeesHasBlotters -------------------------
INSERT INTO EmployeesHasBlotters(emp_id, r_id)
VALUES (2, 2),
	(3, 3),
    (1, 4);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
SET AUTOCOMMIT = 1;
