/**
 * Module dependencies.
 */
var express = require('express'),
	app = module.exports = express.createServer(),
	jade = require('jade'),
	mongoose = require('mongoose'),
	db,
	Chat;


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  
  app.set('db-uri', 'mongodb://localhost/nodechat');
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

//get database reference
db = mongoose.connect(app.set('db-uri'));	//here app.set means app.get
app.Chat = Chat = require('./models.js').Chat(db);

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
