var Product = require('../models/product');
var json2csv = require('json2csv').parse;
var fs =require('fs');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            created_at: new Date(req.body.date)
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.product_using_date = function (req, res) {
    var input = {created_at:{'$gte':new Date(req.query.start).toISOString(), '$lte': new Date(req.query.end).toISOString()}};
    Product.find(input, function (err, product) {
        if (err) return next(err);

        var fields = ['name', 'price', 'created_at'];
        var data = json2csv(product, {fields});
        res.attachment('yourfilenamehere.csv');
        fs.writeFile('input.csv', data, function(err) {
            if (err) {
               return console.error(err);
            }
            
            res.status(200).send("Data written successfully!");
        });
    })
};