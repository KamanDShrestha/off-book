require('dotenv').config();

//importing the express module for acting as the middleware
const express = require('express');

// importing http server to create the server with socketIo
const http = require('http');

const socketIo = require('socket.io');

const cors = require('cors');
//importing function for connecting with DB
const connectDB = require('./db');

//importing body-parser that parses thet extracts the entire body portion of request stream and exposes on the req.body
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//importing cors that restricts the certain requested resource to be accessed depending on the request provided
// const cors = require('cors');
// const connectDB = require('./db');

//for providing a route to use for a certain URL
const bookRouter = require('./routes/books/bookRouter');
const registerRouter = require('./routes/authentication/register');
const loginRouter = require('./routes/authentication/login');
const bookDetailRouter = require('./routes/books/bookDetailRouter');
const userProfileRouter = require('./routes/users/userProfile');
const usersDetailsRouter = require('./routes/users/usersDetails');
const logoutRouter = require('./routes/authentication/logout');
const userDeleteRouter = require('./routes/users/userDelete');
const bookAddRouter = require('./routes/books/bookAdd');
const bookDeleteRouter = require('./routes/books/bookDelete');
const genreAddRouter = require('./routes/genres/genrePost');
const genreRouter = require('./routes/genres/genreRouter');
const createOrderRouter = require('./routes/orders/createOrder');
const getOrderByIdRouter = require('./routes/orders/getOrderDetails');
const getMineOrders = require('./routes/orders/getLoggedInOrderDetails');
const updatePaymentStatus = require('./routes/orders/updatePaymentStatus');
const updateDeliveryStatus = require('./routes/orders/updateDeliveryStatus');
const getAllOrders = require('./routes/orders/getAllOrders');
const wishlistAddRouter = require('./routes/wishlist/wishlistAdd');
const getWishlistRouter = require('./routes/wishlist/getWishlist');
const payForOrder = require('./routes/payment/khaltiPayment');
//helmet as middleware
//for setting up HTTPs header wihtin the response for security purposes
const helmet = require('helmet');

connectDB();

//initializing the express
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // this needs to be the origin of your request
  credentials: true, // this needs to be set to true
};

app.use(cors(corsOptions));
// creating the http server
const server = http.createServer(app);

//creating the io for within the server
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

//middleware
app.use(helmet());
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Add DELETE to the list of allowed methods
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

// //setting the port
// app.set('PORT', process.env.SERVER_PORT || 8000);

//using the body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

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

//routes for triggering different authentication and response generation
app.use('/', bookRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/profile', userProfileRouter);
app.use('/api/users', usersDetailsRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/users', userDeleteRouter);

app.use('/api/book', bookDetailRouter);
app.use('/api/books', bookAddRouter);
app.use('/api/books', bookDeleteRouter);

app.use('/api/genres', genreAddRouter);
app.use('/api/genres', genreRouter);

app.use('/api/addWishList', wishlistAddRouter);
app.use('/api/wishlist', getWishlistRouter);

app.use('/api/newOrder', createOrderRouter);
app.use('/api/orders', getOrderByIdRouter);
app.use('/api/mineOrders', getMineOrders);
app.use('/api/orders', updatePaymentStatus);
app.use('/api/orders', updateDeliveryStatus);
app.use('/api/orders', getAllOrders);

app.use('/api/pay', payForOrder);

//implementing socket for chat functionality

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//   });

//   socket.on('joining message', (username) => {
//     console.log('New client joined', username);
//     socket.name = username;
//     io.emit('messageResponse', `${socket.name} has joined the chat`);
//   });

//   socket.on('leaving chat', () => {
//     console.log('user disconnected');
//     io.emit('messageResponse', `${socket.name} has left the chat`);
//   });

//   socket.on('chat message', (message) => {
//     console.log('getting message', message);
//     socket.emit('messageResponse', message);
//   });
// });

//listening for the request on the port no 5000
server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
