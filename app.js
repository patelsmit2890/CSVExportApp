// app.js

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('./controllers/product');
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://127.0.0.1:27017/productstutorial';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use('/products', product);
app.use(express.static(path.join(__dirname, 'public')));

var port = 3003;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.get('/test', product_controller.test);


app.post('/create', product_controller.product_create);

app.get('/:id', product_controller.product_details);

app.get('/getProducts', product_controller.product_using_date);
app.post('/getProducts', product_controller.product_using_date);

app.put('/:id/update', product_controller.product_update);

app.delete('/:id/delete', product_controller.product_delete);
