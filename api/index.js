const express = require("express");
var bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");
const { mongoose } = require("./db/mongoose");
const { users } = require("./models/users");
var { authenticate } = require("./middleware/authenticate");
import axios from "axios";

//passport initializatios
//const passport = require('passport');
//const authroute = require('./routes/auth-routes');
//const profileRoutes = require('./routes/profile-routes');
//const passportSetup = require('./config/passport-setup');

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();

//app.use('/authroute', authroute);

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

// // Add POST - /api/login
// router.post('/login', (req, res) => {
//   console.log('In login block')
//   var id = req.body.username;
//   if(!ObjectID.isValid){
//     res.status(401).json({ message: 'Bad credentials' })
//   }

//   users.findById(id).then((userslist)=>{
//     var id1 = userslist.id;
//     console.log(userslist.id)
//   if (req.body.username === userslist.id && req.body.password === userslist.password) {
//     req.session.authUser = { userId: req.body.username }
//     return res.json({ userId: req.body.username })
//   }
//   }, (e) =>{
//    res.status(401).json({ message: 'Bad credentials' })
//   });
// })

//get email
app.post("/login", (req, res) => {
  var body = _.pick(req.body, ["username", "password"]);
  users
    .findByCredentials(body.username, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        //  res.header('x-auth',token).send(user)
        req.session.authUser = { userId: token };
        return res.json({
          userId: token,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber
        });
      });
    })
    .catch(e => {
      res.status(401).send();
    });
  //   users.findOne({email:myemail}).then((userslist)=>{
  //     if (req.body.password === userslist.password) {
  //       req.session.authUser = { userId: req.body.username }
  //       return res.json({ userId: req.body.username })
  //     }
  //     else{
  //       res.status(401).json({ message: 'Bad credentials' })
  //     }

  // }, (e) =>{
  //   res.status(401).json({ message: 'Bad credentials' })
  // }
  // );
});

// Add POST - /api/logout
app.post("/logout", (req, res) => {
  delete req.session.authUser;
  res.json({ ok: true });
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  var body = _.pick(req.body, [
    "fullName",
    "password",
     "contact",
    "gender",
    "zipCode"
  ]);
 var newUser = new users(body);

  //  var newUser = new users({
  //    fullName: req.body.fullName,
  //    lastName:req.body.lastName,
  //    password: req.body.password,
  //    email: 'gopalgo@gmail.com',
  //    phoneNumber: req.body.phoneNumber,
  //    gender: req.body.gender,
  //    zipCode: req.body.zipCode
  //  });
  console.log("User created");

  newUser
    .save()
    .then(() => {
      return newUser.generateAuthToken();
    })
    .then(token => {
      req.session.authUser = { userId: token };
      return res.json({
        userId: token,
        fullName: newUser.fullName,
        phoneNumber: newUser.phoneNumber
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/list", authenticate, (req, res) => {
  res.send(req.user);
  // users.find().then((userslist)=>{
  //    res.send(userslist);
  // },
  // (e) =>{
  //   res.status(400).send(e);
  // });
});

// Export the server middleware
app.get("/profile", (req, res) => {
  res.send("You have logged in");
});

app.post("/sendOTP", (req, res) => {
  console.log(req.body.phoneNumber);
  var nexmoSend = {
    api_key: "74ca638f",
    api_secret: "bYQfq9jqiTLBCxXG",
    number: req.body.phoneNumber,
    brand: "NexmoVerifyTest"
  };
  axios
    .post("https://api.nexmo.com/verify/json ", nexmoSend)
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      res.status(401).send("Error sending OTP");
    });
});

app.post("/verifyOTP", (req, res) => {
  console.log(req.body.code);
  console.log(req.body.request_id);

  var nexmoSend = {
    api_key: "74ca638f ",
    api_secret: "bYQfq9jqiTLBCxXG",
    request_id: req.body.request_id,
    code: req.body.code
  };
  axios
    .post("https://api.nexmo.com/verify/check/json", nexmoSend)
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      res.status(401).send("Error sending OTP");
    });
});

export default {
  path: "/api",
  handler: app
};
