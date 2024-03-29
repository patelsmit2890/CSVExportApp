var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    created_at: {type: Date, require: true}
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);