var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bikemender'); // connect to our database


var Bear = require('./models/events');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here


/*----------------creating-----------------------------------------*/
router.route('/station')

// create a bear (accessed at POST http://localhost:8081/api/station)
    .post(function (req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.station_name = req.body.station_name;  // set the bears name (comes from the request)
        bear.station_address = req.body.station_address;  // set the bears name (comes from the request)
        bear.station_number = req.body.station_number;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'station created!'});
        });

    })
/*------------------------------Get all the data-------------------------------------------*/
// get all the bears (accessed at GET http://localhost:8081/api/station)
.get(function (req, res) {
    Bear.find(function (err, bears) {
        if (err)
            res.send(err);

        res.json(bears);
    });
});












// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

