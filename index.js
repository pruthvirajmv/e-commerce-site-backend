const express = require('express');
const bodyParser = require('body-parser');


const products = require('./routes/products.route');
const users = require('./routes/users.route');
const wishlist = require('./routes/wishlist.route');
const cart = require('./routes/cart.route');


const app = express();

app.use(express.json());

const setupDbConnection  = require('./db/db');

setupDbConnection(); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, email, password,username");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.use('/products', products)

app.use('/users', users)

app.use('/wishlist', wishlist)

app.use('/cart', cart)

//page not found error should be the last route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check" })
})

const Port = process.env.PORT || 5000

app.listen(Port, () => {
  console.log(`server started @ ${Port}`);
});