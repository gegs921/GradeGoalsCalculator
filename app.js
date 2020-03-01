require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const saltRounds = 10;
const dbuname = process.env.DB_UNAME;
const dbpassword = process.env.DB_PASSWORD;

let sess;

const app = express();
const port = process.env.PORT;

let db = mongoose.connect(`mongodb://${dbuname}:${dbpassword}@ds137827.mlab.com:37827/ggcdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));


app.get('/', (req, res) => {
  sess = req.session;
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/login.html'));
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

app.post('/registrationComplete', (req, res) => { 
  let userData = {
    email : req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(userData.password, salt, function(err, hash) {
      userData.password = hash;
      let userModelInstance = new User(userData);

      userModelInstance.save((err, user) => {
        if(err) return console.error(err);
        else { 
          sess = req.session;
          sess.email = req.body.email;
          res.redirect('/');
        }
      });
    })
  });
});

app.post('/loginComplete', (req, res) => {
  // User.findOne({ email: req.body.email })
  //   .exec(function(err, user) {
  //     if(err || !user) {
  //       const err = new Error('User not found.');
  //       err.status = 401;
  //       return callback(err);
  //     }
  //     bcrypt.compare(req.body.password, user.password, function(err, result) {
  //       if(result === true) {
  //         req.session.userId = user._id;
  //         res.redirect('/');
  //       }
  //       else {
  //         return callback();
  //       }
  //     });
  //   })
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err || !user) {
      console.log(err);
      return;
    }
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if(result === true) {
        console.log('ran');
        sess = req.session;
        sess.email = req.body.email;
        res.redirect('/');
      }
      else {
        console.log('incorrect password');
        return;
      }
    })
  });
});

app.post('/logout', function(req, res, next) {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  })
})

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
