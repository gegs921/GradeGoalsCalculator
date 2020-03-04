require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const saltRounds = 10;
const dbuname = process.env.DB_UNAME;
const dbpassword = process.env.DB_PASSWORD;

const app = express();
const port = process.env.PORT;

let db = mongoose.connect(`mongodb://${dbuname}:${dbpassword}@ds137827.mlab.com:37827/ggcdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/register', (req, res) => {
  if(req.session.email) {
    res.send('You are already logged into your account.');
  }
  else {
    res.sendFile(path.join(__dirname + '/public/register.html'));
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/user', (req, res) => {
  User.findOne({ email: req.session.email }, function(err, user) {

    if(user) {
      res.json({
        id: user.id,
        username: user.username,
        email: user.email
      });
    }
    else {
      res.json({});
    }
  })
});

app.get('/logout', function(req, res, next) {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

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
          req.session.email = req.body.email;
          res.redirect('/');
        }
      });
    })
  });
});

app.post('/loginComplete', (req, res) => {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err || !user) {
      console.log(err);
      return;
    }
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if(result === true) {
        console.log(req.session);
        req.session.email = req.body.email;
        res.redirect('/');
      }
      else {
        console.log('incorrect password');
        return;
      }
    });
  });
});

app.post('/usernameandemailcheck', (req, res) => {
  User.find({ username: req.body.username, email: req.body.email }, function(err, user) {
    if(err) {
      console.log(err);
    }
    else if(!user) {
      res.send(true);
    }
    else {
      res.send(false);
    }
  });
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
