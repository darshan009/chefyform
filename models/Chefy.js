var mongoose = require('mongoose');

var chefydataSchema = new mongoose.Schema({
  name: String,
  about: String,
  type: String,
  categories: String,
  address: String,
  country: String,
  email: String,
  contactUser: String,
  logo: String,
  product: [{
    productName: String,
    attributes: {type:mongoose.Schema.ObjectId, ref:'Attributes'}
  }]
});

module.exports = mongoose.model('Chefy', chefydataSchema);
