const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /api/users - Get list of users */
/** POST /api/users - Create new user */
router.route('/create')
    //.get(userCtrl.list)
    .post(validate(paramValidation.createUser), (req, res) => {
        userCtrl.create(req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.userType)
            .then(function(response) {
                res.status(200).json(response);
            })
            .catch(function(response) {
                res.status(400).json(response);
            });
    });

router.route('/unlock')
    .get((req, res) => {
        userCtrl.unlock(req.query.username)
            .then((response) => {
                res.json({
                    unlocked: response
                });
            });
    });

router.route('/getUserByUsername')
    .get(userCtrl.getUserByUsername);

router.route('/getAllStudents')
    .get((req, res) => {
        userCtrl.getAllStudents()
            .then((response) => {
                res.json(response)
            });
    });

router.route('/:userId')
    /** GET /api/users/:userId - Get user */
    .get(userCtrl.get)

    /** PUT /api/users/:userId - Update user */
    .put(validate(paramValidation.updateUser), userCtrl.update)

    /** DELETE /api/users/:userId - Delete user */
    .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;