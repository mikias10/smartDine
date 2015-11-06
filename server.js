var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


mongoose.connect('mongodb://localhost/nodester');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

/*---- define model ---- */

var Schema = mongoose.Schema;
var patronSchema = new Schema({
	text: String
});
var Patron = mongoose.model('Patron', patronSchema);

/*---- routes -----------*/


/* get all patrons */

app.get('/api/patrons', function(req, res){

	Patron.find(function(err, patrons){

		if(err) {
			res.send(err);
		} else {
			res.json(patrons);
		}
	});
});


//Create a patron and send back all patrons after

app.post('/api/patrons', function(req, res){

	Patron.create({
		text: req.body.text,
		done: false
	}, function(err, patron){

		if(err) {
			res.send(err)
		} 

		Patron.find(function(err, patrons){

			if(err) {
				res.send(err);
			} else {
				res.json(patrons);
			}
		});
	});
});

// Delete a patron

app.delete('/api/patrons/:patron_id', function(req, res){

	Patron.remove({ 
		_id: req.params.patron_id
	}, function(err, patron){

		if(err) {
			res.send(err);
		} 

		Patron.find(function(err, patrons){
			if(err){
				res.send(err);
			} else {
				res.json(patrons);
			}
		});
	});
});


app.get('*', function(req, res){
	res.sendFile('./public/index.html');
});


app.listen(3000);
console.log('App listening on port 3000');