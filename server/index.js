let express = require('express');
let bodyParser = require('body-parser');
let db = require('../database-mysql');
let session = require('express-session');
let path = require('path');
require('dotenv').config();
let passport = require('passport');
let flash = require('connect-flash');
let serverHelpers = require('../lib/serverHelpers.js');
let app = express();

require('../server/config/passport')(passport);

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_PASSWORD || 'supersecretsecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // uses flash connect to allow flash messages in stored session
app.use(express.static(path.join(__dirname, '../react-client/dist')));

// This wildcard acts as a catch-all to let react-router redirect instead of using Express to
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-client/dist', '/index.html'))
})

let port = process.env.PORT || 3000; // these process variables are for deployment because Heroku won't use port 3000

app.listen(port, function() {
  console.log(`The server is listening on port ${ port }!`);
});

// EVERYTHING BELOW TO BE DELETED?

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   res.code(401).end('You must log in to do that!');
// }

// ///// MAIN PAGE REQUESTS /////
// app.get('/', function(req, res) {
//   // will render index page regardless of logged in or not
//   // but only those logged in will be able to create/save
//   res.render('index');
// });

// // get request for specific candidate
// app.get('/candidates/:id', function(req, res) {
//   // retreive candidate information from DB
//   db.getCandidateById(function(err, data) { // this function doesn't actually exist yet
//     if(err) {
//       console.log('Error finding candidate');
//       res.status(500).end();
//     } else {
//       console.log('Successfully retreived candidate');
//       res.status(200).send(JSON.stringify(data));
//     }
//   });
// });

// // a post request adds to the list of candidates
// // or should this be a request to the API??
// app.post('/candidates', function(req, res) {
//   // receives post request upon new candidate form submission
//   // parse out all of the information from the req.body
//   // check if that candidate exists in the database
//   // save to the database
//   // res.status(201).end()
// });

// // get request for specific event
// app.get('/events/:id', function(req, res) {
//   // retreive event information from DB
//   db.getEventById(function (err, data) { // this function doesn't actually exist yet
//     if (err) {
//       console.log('Error finding event');
//       res.status(500).end();
//     } else {
//       console.log('Successfully retreived event');
//       res.status(200).send(JSON.stringify(data));
//     }
//   });
// });

// // a post request adds to the list of events
// // or should this be a request to the API??
// app.post('/events', function(req, res) {
//   // receives post request upon new candidate form submission
//   // parse out all of the information from the req.body
//   // check if that candidate exists in the database
//   // save to the database
//   // res.status(201).end()
// });


// ///// USER-RELATED REQUESTS /////
// app.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

// app.post('/signup', passport.authenticate('local-signup', { // passport middleware authenticates signup
//   successRedirect: '/', // on success, redirect to main feed page
//   failureRedirect: '/', // on failure, keep on signup page
//   failureFlash: true
// }));


// app.post('/logout', function(req, res) {
//   // terminate session id
//   req.session.destroy(function() {
//     // redirect to login page
//     res.status(302).redirect('index')
//   });
// });





/////////////////////////
////// write to db //////
/////////////////////////

// on create user
// db.connection.query('INSERT INTO users VALUES (email, password, bio, role, race) values ? ? ? ? ?', []);

// // on follow
// db.connection.query('INSERT INTO votercandidate (voter_id, candidate_id) values ? ?' []);

// // on create event
// db.connection.query('INSERT INTO events (title, location, time, description, host) values ? ? ? ? ?', []);

// // on create race
// db.connection.query('INSERT INTO races (office, date, location) values ? ? ?', []);

// // on edit profile
// db.connection.query();

// // on rsvp to event
// db.connection.query('INSERT INTO eventsusers (event_id, user_id) values ? ?', []);

// // on follow race
// db.connection.query('INSERT INTO racesusers (user_id, race_id) values ? ?', []);


// ///////////////////////
// //// pull from db //////
// ///////////////////////

// // load feed

// 	// select events from following
// 	db.connection.query();


// 	// select races following
// 	db.connection.query();


// 	// select users following
// 	db.connection.query();



// // load profile

// 	// select user bio/info
// 	db.connection.query();


// 	// select events hosting
// 	db.connection.query();


// 	// select followers
// 	db.connection.query();



// //on post
// //have variables for email, password


// //on post to create event
// db.connection.query('INSERT INTO events (title, location, time, description, host) values []');

// //on get
// db.connection.query('SELECT [name] FROM users, eventsusers WHERE users ')

// //on post


// // to get list of attendees:
// db.connection.query('SELECT [name] FROM users, eventsusers WHERE eventsusers.candidate = x AND eventsusers.voter_id = users.id') //?
