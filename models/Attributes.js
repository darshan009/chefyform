var mongoose = require('mongoose');

var attributesSchema = new mongoose.Schema({
  attributesData: [{
    attributeName: String,
    attributeValue: [String]
  }]
});

module.exports = mongoose.model('Attributes', attributesSchema);
