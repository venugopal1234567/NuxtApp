const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");

const { ObjectID } = require("mongodb");
const _ = require("lodash");
const { mongoose } = require("./db/mongoose");
const { Googleusers } = require("./models/users");
var { authenticate } = require("./middleware/authenticate");

var details = {
  id: "",
  displayName: "",
  email: ""
};

let loggedUser = {};

const app = express();

var GOOGLE_CLIENT_ID =
    "334130888792-k6o29chq2bhv29rmlm4elmvaiqogd9ae.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET = "MZc_kKCMbPTcw-xEY4Di1AxW";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      // process.nextTick(function () {

      //     details.id = profile.id;
      //     details.displayName = profile.displayName;
      //     details.email = profile.email;
      //     return done(null, profile);
      // });

      Googleusers.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", currentUser);
          loggedUser = {};
          loggedUser = currentUser
          done(null, currentUser);
        } else {
            let email = [];
            email.push(profile.email)
          // if not, create user in our db'
          new Googleusers({
            googleId: profile.id,
            fullname: profile.displayName,
            contact: email
          })
            .save()
            .then(newUser => {
                loggedUser = {};
              loggedUser = currentUser;
              console.log("created new user: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  console.log(details);
  res.redirect("/setNewPassword");
});

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        console.log(req.user)
        next();
    }
};

app.get("/", authCheck, (req, res) => {
    console.log('printing logged user')
    console.log(loggedUser.contact)
  res.send({contact:loggedUser.contact, googleId:loggedUser.googleId});
});

export default {
  path: "/auth/",
  handler: app
};
