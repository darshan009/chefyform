var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Chefydata = require('./models/Chefy');
var Attributes = require('./models/Attributes');

var app = express();

//mongoose connection
mongoose.connect("mongodb://chefy:chefy123@ds021711.mlab.com:21711/chefydata");
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function callback(){
  console.log("Mongoose connected to mongolab");
});

//views, bodyparser, cookieParser, session
app.set("views",__dirname+"/views");
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/'));

app.get('/', function(req, res){
  res.render('formPage');
});
app.post('/', function(req, res){
  console.log(req.body);
  var chefydata = new Chefydata ({
    name: req.body.name,
    about: req.body.about,
    type: req.body.type,
    categories: req.body.categories,
    address: req.body.address,
    country: req.body.country,
    email: req.body.email,
    contactUser: req.body.contactUser,
    logo: req.body.logo,
    product: []
  });
  for (var i=0; i<req.body.productName.length; i++) {
    var product = {};
    var attributes = new Attributes({
      attributesData: []
    });
    for (var j=0; j<req.body.attributeName[i].length; j++) {
      var attributesToPush = {};
      attributesToPush = {
        attributeName: req.body.attributeName[i][j],
        attributeValue: []
      }
      if (typeof req.body.attributeValue[i][j] != undefined && req.body.attributeValue[i][j] instanceof Array)
        for (var k=0; k<req.body.attributeValue[i][j].length; k++) {
          attributesToPush.attributeValue.push(req.body.attributeValue[i][j][k]);
        }
      else
        for (var k=0; k<req.body.attributeValue[i].length; k++) {
          attributesToPush.attributeValue.push(req.body.attributeValue[i][j][k]);
        }
      attributes.attributesData.push(attributesToPush);
    }
    console.log(attributes);
    product = {
      productTitle: req.body.productTitle[i],
      productName: req.body.productName[i],
      attributes: attributes._id
    }
    chefydata.product.push(product);
    attributes.save(function (err) {
      if (err) return err;
    })
  }
  chefydata.save(function (err) {
    if (err) return err;
  });
  res.redirect('/')
});

app.get('/chefydata', function(req, res){
  Chefydata.find().exec(function(err, chefydata){
    res.send(chefydata);
  });
});

//listen
var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log("Server connected");
});
