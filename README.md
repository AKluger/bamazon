
# bamazon
A virtual store exhibiting inventory tracking and dynamic updates from user input

### Project Overview
This project mimics a virtual store.  The client interacts with prompts in the command-line interface and based on their input, the store database will be updated.  All of the store product information is stored in a database built with mySQL.  

##### The customer app (bamazonCustomer.js) allows a customer to view products and purchase.   

##### The manager app (bamazonManager.js) allows one to either:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product
![Manager-Demo](./bamazonManager.mov?)


##### The supervisor app (bamazonSupervisor.js) allows one to either:
* View a table of departments, including their total sales and profit
* Add a new department
![Supervisor-screenshot](./bamazonSupervisor.png)

### Initializing the database with mySQL
All of the data lives in a single database, except the total profit column which is generated dynamically upon user request.  There are two tables in the database: Products and Departments.  Departments is only visible to the supervisor.
* run the scripts provided in the schema.sql file
* next run the scripts in the seeds.sql file, feel free to populate the table with items and figures to your liking

### Technologies Used:
* Node.js
* mySQL
* Javascript

##### Authored by me: https://akluger.github.io/Bootstrap-Portfolio/