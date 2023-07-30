//importing the express module for acting as the middleware
const express = require('express');

//importing function for connecting with DB
const connectDB = require('./db');

//importing body-parser that parses thet extracts the entire body portion of request stream and exposes on the req.body
const bodyParser = require('body-parser');

//importing cors that restricts the certain requested resource to be accessed depending on the request provided
// const cors = require('cors');
// const connectDB = require('./db');

//for providing a route to use for a certain URL
const bookRouter = require('./route/bookRouter');

connectDB();

//initializing the express
const app = express();

//setting the port
app.set('PORT', process.env.PORT || 8000);

//using the body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//using the cors
// app.use(
//   cors({
//     allowedHeaders: ['sessionId', 'Content-Type', 'master-token'],
//     exposedHeaders: ['sessionId'],
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//   })
// );

// const data = [
//   {
//     id: 1,
//     firstName: 'Kaman',
//     lastName: 'Shrestha',
//   },
//   {
//     id: 2,
//     firstName: 'Kamarsh',
//     lastName: 'Shrestha',
//   },
// ];

// //making a get request
// app.get('/', (req, res) => {
//   res.send(data);
// });

app.use('/', bookRouter);

//listening for the request on the port no 5000
app.listen(app.get('PORT'), () => {
  console.log('Server is running on port 5000');
});

console.log('jwttoken, dotenv, middleware');
