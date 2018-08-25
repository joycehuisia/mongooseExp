const Promise = require('bluebird');
const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const courseCtrl = require('./course.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /api/users - Get list of users */
/** POST /api/users - Create new user */
router.route('/create')
    //.get(userCtrl.list)
    .post((req, res) => {
        courseCtrl.createNewCourse(req.body.name, req.body.price)
            .then((response) => {
                res.status(200).json(response);
            })
    });

router.route('/addStudentToCourse')
    .get((req, res) => {
        courseCtrl.addStudentToCourse(req.query.courseId, req.query.studentId.split([',']))
            .then((response) => {
                if(response.error) {
                    return Promise.reject(response.response);
                }
                res.status(200).json(response);
            }).catch((response) => {
                res.status(400).json(response);
            });
    });

router.route('/getAllCourses')
    .get((req, res) => {
        courseCtrl.getAllCourses()
            .then((response) => {
                res.status(200).json(response);
            })
    })
module.exports = router;