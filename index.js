const express = require('express');
const cors = require('cors');

const routeNotFound = require('./middlewares/route-not-found.middleware');
const errorHandler = require('./middlewares/error-handler.middleware');
const setHeaders = require('./middlewares/set-headers');

const products = require('./routes/products.route');
const users = require('./routes/users.route');
const wishlist = require('./routes/wishlist.route');
const cart = require('./routes/cart.route');


const app = express();
app.use(express.json());

app.use(cors())

const setupDbConnection  = require('./db/db');
setupDbConnection(); 

app.use(setHeaders);

app.get('/', (req, res) => {
  res.send('Hello, welcome to BaddyMart Backend!')
});

app.use('/products', products)

app.use('/users', users)

app.use('/wishlist', wishlist)

app.use('/cart', cart)

//page not found & error should be the last route
app.use(errorHandler);
app.use(routeNotFound);

const Port = process.env.PORT || 5000

app.listen(Port, () => {
  console.log(`server started @ ${Port}`);
});