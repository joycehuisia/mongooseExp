const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');
const encrypt = require('../utils/encrypt');

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function loginOld(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  console.log(JSON.stringify(req.headers));
  User.find({username: req.body.username}, (err, user) => {
    if (err) return res.status(500).send(err)

    // send the list of all people in database with name of "John James" and age of 36
    // Very possible this will be an array with just one Person object in it.
    return res.status(200).send(user);
  });
  /*if (req.body.username === user.username && req.body.password === user.password) {
    const token = jwt.sign({
      username: user.username
    }, config.jwtSecret);
    return res.json({
      token,
      username: user.username
    });
  }*/
/*
  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  return next(err);*/
}

function login(username, password) {
    return User.findOne({username: username})
        .then((user) => {
            if(user.isLocked()) {
                return Promise.resolve("This account is currently locked. Please contact the administrator to unlock this account");
            }

            if(user.verifyPassword(password)) {
                return user.unlock()
                    .then(function(user) {
                        return user;
                    });
            }

            return user.incrementLock()
                .then(function(attempts) {
                    if(attempts >= 5) {
                        return Promise.resolve("This account is currently locked. Please contact the administrator to unlock this account");
                    }
                    return Promise.resolve("Invalid username or password.");
                    //return ""
                });
        });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber };
