# CRM-MVC
A customer relationship management tool with statistics and revenue projection.

**Application Link** [Sign up or login here](https://crm-mvc.herokuapp.com/login)

## Technology Used
- Languages: JavaScript, HTML 5, CSS,
- Database: MongoDB
- Notable Frameworks/Dependencies: Mongoose, Express.JS, Chart.js, Passport.JS, Nodemailer, Bootswatch, Regression.JS, EJS, Express rate limit, and Express Session,  

## Project Description

The application's main use is to enable the user to keep track of customer information as well as keep track of open and paid invoices for those customers.

<img width="1438" alt="image" src="https://user-images.githubusercontent.com/27248034/165861787-e7219458-d5d0-4bc7-8ec3-cdc04b792a3a.png">

The user can either register with a username, email, and password, or they can use Google Oauth2 SSO. If the user forgets their password they can have a temporary password emailed to their registered email, which they can then change using the change password function.

<img width="1438" alt="image" src="https://user-images.githubusercontent.com/27248034/165861986-1016a26b-7092-4088-a9d2-07a44f2ca45b.png">

<img width="1436" alt="image" src="https://user-images.githubusercontent.com/27248034/165862056-5685a69f-31e3-4e32-a000-fcd28c03c029.png">
<p align="center">
  
The main page displays the customer list as well as charts to keep track of: AR management, Customer Lifetime Revenue, Customer Country Summary, Total Monthly Revenue, and One Year Projected Revenue using linear regression.
  
![CRM 2022-04-28 at 7 38 36 PM](https://user-images.githubusercontent.com/27248034/165864518-a6be679f-a5bb-4f24-ae75-6dd04aff9e9f.jpg)
  
![Screen Recording 2022-04-28 at 07 41 29 PM](https://user-images.githubusercontent.com/27248034/165864780-f9d749c5-0c41-475d-9d83-b799b2128365.gif)

There is also a separate customer list and invoice list which are filterable by customer name, invoice amount, invoice date, and paid status where available.

![Screen Recording 2022-04-28 at 07 31 17 PM](https://user-images.githubusercontent.com/27248034/165863926-f229ae8b-0f2f-470c-b5a2-44b7f7ab5ec8.gif)

![Screen Recording 2022-04-28 at 07 45 53 PM](https://user-images.githubusercontent.com/27248034/165865081-b2b6f653-a74b-4d0d-ac9a-e67313e2923f.gif)
  
The individual customer details page for each customer features all of the details available, including a customer photo, email, phone, website, address, city, zip code, notes, the created date, the customer country, and the state. All of the relevant invoices are also linked and a button to mark the individual invoice is available. The user can edit the customer on this page and delete the customer as well which will delete all of the invoices for the customer.
  
![Screen Recording 2022-04-28 at 07 49 49 PM](https://user-images.githubusercontent.com/27248034/165865387-62b55831-ff11-466e-a63b-6324210cae56.gif)

The individual invoice details page for each invoice features all of the invoice details available, including the customer name with link, invoice amount, due date, invoice date, contact name, contact number, paid status, billing address, invoice line items, memo, created date, and payment information. The user can edit the invoice on this page, mark it as paid, and delete the invoice.

![Screen Recording 2022-04-28 at 08 03 16 PM](https://user-images.githubusercontent.com/27248034/165866490-37c5b40b-a993-4566-bbb4-81ae183e78a3.gif)
  
New customers and invoices can be added from the Add a Customer and Add an invoice page. You must select a customer to be able to generate an invoice.

<img width="1436" alt="image" src="https://user-images.githubusercontent.com/27248034/165866530-e8551fff-b6ec-436c-8ac2-dbc9bb78dde7.png">

![Screen Recording 2022-04-28 at 08 07 15 PM](https://user-images.githubusercontent.com/27248034/165866711-cb5f5a1c-ed6c-462e-918b-bcc9a3932f32.gif)

The username or Google name is displayed at the top of the page. All creations, updates, and deletions are logged for future tracking on the logs page.

![CRM 2022-04-28 at 8 08 51 PM](https://user-images.githubusercontent.com/27248034/165866799-04152343-59fd-4e16-8b1d-f48c14823589.jpg)
  
## User Stories
  
-As a user I want to be able to create a new customer and store them in the database
-As a user I want to be able to update a customer from the db
-As a user I want to be able to delete a customer
-As a user I want to be able to see more information for a specific customer by clicking on them

## Stretch Goals
-Full CRUD for another model like invoices that could relate to the customer
-A search bar that let's you search by customer name or partial customer name
-A user login function with SSO

## Features to Improve in Future
-Better more descriptive logs.
-More interactive and customizable charts.
