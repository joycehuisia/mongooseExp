const Promise = require('bluebird');
const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const classCtrl = require('./class.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /api/users - Get list of users */
/** POST /api/users - Create new user */
router.route('/create')
    //.get(userCtrl.list)
    .post((req, res) => {
        classCtrl.createNewClass(req.body.name, req.body.price)
            .then((response) => {
                res.status(200).json(response);
            })
    });

router.route('/getAllClasses')
    .get((req, res) => {
        courseCtrl.getAllCourses()
            .then((response) => {
                res.status(200).json(response);
            })
    })
module.exports = router;