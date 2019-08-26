"use strict";

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { User, validate, validateAuth } = require('./models/user');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const config = require('config');
const auth = require('./middleware/auth');

const API_PORT = 3333;
const app = express();

app.use(cors());
const router = express.Router();

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined.');
  process.exit(1);
}

// this is our MongoDB database
const dbRoute =
  'mongodb://localhost/';

const dbCollection = dbRoute + 'dashb';


// connects our back end code with the database
mongoose.connect(dbCollection, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getUsers', (req, res) => {
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });

    const userData = data.map(user => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

    return res.json({ success: true, data: userData });
  });
});

router.post('/getPaginatedUsers', (req, res) => {
  let pageNo = parseInt(req.body.pageNo);
  let usersPerPage = parseInt(req.body.usersPerPage);
  let query = {};

  if (pageNo < 0 || pageNo === 0) {
    let response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response);
  }

  query.skip = usersPerPage * (pageNo - 1);
  query.limit = usersPerPage;

  User.countDocuments({}, (err, totalCount) => {
    if (err) {
      let response = { "error": true, "message": "Error fetching data" }
      res.json(response);
    }

    User.find({}, {}, query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        let response = { "error": true, "message": "Error fetching data" };
        res.json(response);
      } else {
        let totalPages = Math.ceil(totalCount / usersPerPage);

        const usersData = data.map(user => {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        });

        let response = { "error": false, "data": usersData, "pages": totalPages };
        res.json(response);
      }
    });
  });

});

// this method gets one user by it's email
router.post('/getUserByEmail', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("User doesn't exist");
  } else {
    res.json({
      id: user._id,
      name: user.name,
      role: user.role,
    });
  }
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateUser', auth, (req, res) => {
  const { id, update } = req.body.data;
  User.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteUser', auth, (req, res) => {
  const { id } = req.body;
  User.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post('/createUser', async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send('That user already exisits!');
  } else {
    // Insert the new user if they do not exist yet
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'user',
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  }
});

// This is our Auth method 
// it works to validate the login from the user 
router.post('/authUser', async (req, res) => {
  // First Validate The HTTP Request
  const { error } = validateAuth(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  User.findOne({
    email: req.body.email
  }, async function (err, user) {
    if (err) throw err;

    // validation
    if (!user) {
      res.json({
        success: false,
        message: "Authentication failed. User not found"
      })
      return;
    }

    let validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res.json({
        success: false,
        message: 'Authentication failed. Wrong password.'
      })
      return;
    }

    // when valid -> create token
    let token = user.generateAuthToken();

    res.json({
      success: true,
      message: 'Authentication successfully finished.',
      token: token
    });

  });

});


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

exports.dbCollection = dbCollection;