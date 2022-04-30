# CRM-MVC
![Logo](https://i.imgur.com/jlNZDhw.png)
</br>
A customer relationship management tool with AR statistics and revenue projection built via Model-View-Controller architecture.

## Application Link: [Sign up or login here](https://crm-mvc.herokuapp.com/login) 


## Technology Used
- Languages: JavaScript, HTML5, CSS
- Database: MongoDB
- Notable Frameworks/Dependencies: [Mongoose](https://mongoosejs.com/) , [Express.JS](https://expressjs.com/), [Chart.JS](https://www.chartjs.org/), [Passport.JS](https://www.passportjs.org/), [Nodemailer](https://nodemailer.com/about/), [Plotly](https://plotly.com/),[Bootswatch](https://bootswatch.com/), [Regression.JS](https://www.npmjs.com/package/regression), [EJS](https://ejs.co/), [Express rate limit](https://www.npmjs.com/package/express-rate-limit), and [Express Session](https://www.npmjs.com/package/express-session).

## Project Description

The application's main use is to enable the user to keep track of customer information, keep track of open and paid invoices for those customers, and predict future revenue based off historical data.

<img width="1438" alt="image" src="https://user-images.githubusercontent.com/27248034/165861787-e7219458-d5d0-4bc7-8ec3-cdc04b792a3a.png">

The user can either register with a username, email, and password, or they can use Google Oauth2 SSO. If the user forgets their password they can have a temporary password emailed to their registered email, which they can then change using the change password function.

<img width="1438" alt="image" src="https://user-images.githubusercontent.com/27248034/165975693-a789a7d4-4fd6-4a98-bddd-07faaf865356.png">

<img width="1438" alt="image" src="https://user-images.githubusercontent.com/27248034/165861986-1016a26b-7092-4088-a9d2-07a44f2ca45b.png">

<img width="1436" alt="image" src="https://user-images.githubusercontent.com/27248034/165862056-5685a69f-31e3-4e32-a000-fcd28c03c029.png">
<p align="center">
  
The main page displays the customer list as well as charts to keep track of customer analytics.

| Chart | Description |
| ------ | ----------- |
| AR Management  | The number of unpaid invoices per customer. |
| Customer Lifetime Revenue | The total invoiced amount per customer. |
| Customer Country Summary | A breakdown of customer country demographics. |
| Monthly Total Revenue | The last year of revenue per month
| One Year Monthly Projected Revenue | A linear regression of the monthly total revenue to project future revenue.|

# AR Management
  
![Screen Recording 2022-04-29 at 11 33 19 AM](https://user-images.githubusercontent.com/27248034/165977622-96b6d365-4cd6-4546-9ec9-06657ea5483f.gif)

# Customer Lifetime Revenue
 
<img width="748" alt="image" src="https://user-images.githubusercontent.com/27248034/165977942-6e0864d7-36b8-438c-8994-9ce174759e93.png">

# Customer Country Summary
  
<img width="614" alt="image" src="https://user-images.githubusercontent.com/27248034/165978059-a9dbd18b-1826-4cda-9c13-c66a03bd7941.png">
  
# Monthly Total Revenue

<img width="738" alt="image" src="https://user-images.githubusercontent.com/27248034/165978114-061859e7-dcb2-4394-ba7d-d22393d1f7e5.png">  
  
# One Year Monthly Projected Revenue 
    
![Screen Recording 2022-04-29 at 11 41 55 AM](https://user-images.githubusercontent.com/27248034/165980220-6f18fdf2-6397-48a8-a848-c5ddf97f8228.gif)
  
    let datapass = []
    for(let w=0;w<xArray.length;w++){ let data1 = [parseInt(xArray[w]),parseInt(yArray[w])]; datapass.push(data1) }
    var result = regression('linear', datapass);
    var coeff = result.equation;
    // Generate values
    var xValues = [];
    var yValues = [];
    for (var x =0; x <= 24; x += 1) {
    xValues.push(x);
    yValues.push((x * coeff[0])+coeff[1]);}
    var data = [ {x:xArray, y:yArray, mode:"markers", name:"Real Revenue"},
    {x:xValues, y:yValues, mode:"line",name:"Rev Projection"},];
    var layout = { xaxis: {range: [0, 24], title: "Months"},
    yaxis: {range: [0, yValues[yValues.length]], title: "Revenue"},  
    title: "One Year Revenue Projection", showlegend:false,};
    Plotly.newPlot("myPlot", data, layout);

There is also a separate customer list and invoice list which are filterable by customer name, invoice amount, invoice date, and paid status where available.

![Screen Recording 2022-04-28 at 07 31 17 PM](https://user-images.githubusercontent.com/27248034/165863926-f229ae8b-0f2f-470c-b5a2-44b7f7ab5ec8.gif)

![Screen Recording 2022-04-28 at 07 45 53 PM](https://user-images.githubusercontent.com/27248034/165865081-b2b6f653-a74b-4d0d-ac9a-e67313e2923f.gif)
  
The individual customer details page for each customer features all of the details available, including a customer photo, email, phone, website, address, city, zip code, notes, the created date, the customer country, and the state. All of the relevant invoices are also linked and a button to mark the individual invoice is available. The user can edit the customer on this page and delete the customer as well which will delete all of the invoices for the customer.
  
<img width="1435" alt="image" src="https://user-images.githubusercontent.com/27248034/165980737-df1417af-86ec-45ea-ab88-961031c47169.png">
  
![Screen Recording 2022-04-28 at 07 49 49 PM](https://user-images.githubusercontent.com/27248034/165865387-62b55831-ff11-466e-a63b-6324210cae56.gif)

The individual invoice details page for each invoice features all of the invoice details available, including the customer name with link, invoice amount, due date, invoice date, contact name, contact number, paid status, billing address, invoice line items, memo, created date, and payment information. The user can edit the invoice on this page, mark it as paid, and delete the invoice.

![Screen Recording 2022-04-28 at 08 03 16 PM](https://user-images.githubusercontent.com/27248034/165866490-37c5b40b-a993-4566-bbb4-81ae183e78a3.gif)
  
New customers and invoices can be added from the Add a Customer and Add an invoice page. You must select a customer to be able to generate an invoice.

<img width="1436" alt="image" src="https://user-images.githubusercontent.com/27248034/165866530-e8551fff-b6ec-436c-8ac2-dbc9bb78dde7.png">

![Screen Recording 2022-04-28 at 08 07 15 PM](https://user-images.githubusercontent.com/27248034/165866711-cb5f5a1c-ed6c-462e-918b-bcc9a3932f32.gif)

The username or Google name is displayed at the top of the page. All creations, updates, and deletions are logged for future tracking on the logs page.

![CRM 2022-04-28 at 8 08 51 PM](https://user-images.githubusercontent.com/27248034/165866799-04152343-59fd-4e16-8b1d-f48c14823589.jpg)
    
  
    // Log generation function for express routes.
    function generateLog(reqBodyOwner, reqBody, message) {
      let stamp = Date();
      let logdata = {
      owner: reqBodyOwner,
      timestamp: stamp,
      details: reqBody,
      action: message,
    };
    Log.create(logdata).then(() => {
      console.log(logdata);
    });
    }

### Wireframes

<img width="889" alt="image" src="https://media.git.generalassemb.ly/user/41021/files/bca3ef80-b81f-11ec-9d3a-4030e0d4d426">

## User Stories
  
- As a user I want to be able to create a new customer and store them in the database
- As a user I want to be able to update a customer from the db
- As a user I want to be able to delete a customer
- As a user I want to be able to see more information for a specific customer by clicking on them

## Stretch Goals
- Full CRUD for another model like invoices that could relate to the customer
- A search bar that let's you search by customer name or partial customer name
- A user login function with SSO

## Features to Improve in Future
- Better more descriptive logs.
- More interactive and customizable charts.
- Support image uploading
- Add more SSO Options


## Resources Used
- https://www.geeksforgeeks.org/login-form-using-node-js-and-mongodb/
- https://www.loginradius.com/blog/engineering/google-authentication-with-nodejs-and-passportjs/
- https://www.technicalkeeda.com/html-tutorials/all-countries-drop-down-list-in-html
- https://stackoverflow.com/questions/50738490/prevent-a-white-space-in-the-beginning-of-a-input
- https://www.w3schools.com/howto/howto_js_filter_lists.asp 
- https://stackoverflow.com/questions/1497481/javascript-password-generator


