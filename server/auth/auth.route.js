const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');
const userCtrl = require('../user/user.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
    .post(validate(paramValidation.login), (req, res) => {
        authCtrl.login(req.body.username, req.body.password)
            .then(function(response) {
                res.status(200).json({
                    response: response
                });
            });
    });

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
    .get(expressJwt({
        secret: config.jwtSecret
    }), authCtrl.getRandomNumber);

router.route('/register')
    .post(validate(paramValidation.createUser), userCtrl.create);

module.exports = router;