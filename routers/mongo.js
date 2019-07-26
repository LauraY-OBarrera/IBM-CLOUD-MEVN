
'use strict';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); 
const mongoURL = process.env.MONGO_URL || 'localhost';
const mongoUser = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';
const mongoDBName = process.env.MONGO_DB_NAME || 'registrants';

module.exports = function(app){

	// set up other middleware
	 app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json()); 

	const options = {
		ssl: false,
		sslValidate: false,
		poolSize: 1,
		reconnectTries: 1
	};

	// connect to the MongoDB
	let mongoConnect = 'mongodb://localhost/Movies';
	if (mongoURL !== '' && mongoUser !== '' && mongoPass != '') {
  		mongoConnect = `mongodb://${mongoUser}:${mongoPass}@${mongoURL}/${mongoDBName}`;
	} else if (mongoURL !== '') {
  		mongoConnect = `mongodb://${mongoURL}/${mongoDBName}`;
	}
	/* mongoose.connect(mongoConnect,options)
	  .then(db => console.log('db connect'))
	  .catch(err =>console.log(err)); */

	/* mongoose.Promise = global.Promise;*/
	mongoose.connect(mongoConnect, options)
  		.catch((err) => {
    		if (err) console.error(err);
  	});

	var db = mongoose.connection;
	db.on('error', (error) => {
        console.error(error);
	});
	 var sess = {
	  store: new MongoStore({ mongooseConnection: mongoose.connection }),
	  name: 'mean example',
	  secret: 'ninpocho',
	  resave: false,
	  saveUnitialized: true,
	  cookie: {}
	};

	app.use(session(sess)); 

	console.info('Connection established with mongodb');
	console.info(`Connection details: ${mongoConnect}`);
};
