const Promise = require('bluebird');
const Course = require('./course.model');
const Student = require('../user/student.model');
const User = require('../user/user.model');
const mongoose = require('mongoose');


function createNewCourse(courseName, coursePrice) {  5 .\1
    return Course.createNewCourse(courseName, coursePrice);
}

function addStudentToCourse(courseId, studentList) {

    let students = [],
        users = [],
        courseObject;


    return Course.findOne({
            _id: courseId
        })
        .then((course) => {
            courseObject = course;
            return course.addStudents(studentList);
        }).then((response) => {
            return Student.addStudentsToCourse(studentList, courseId);
        }).then((response) => {
            //return proper response
            return response;
        }).catch((error) => {
            return Promise.reject({
                error: "The selected course does not exist."
            });
        });
}

function getCourseById(courseId) {
    return Course.findOne({
        id: courseId
    });
}

function getCourseByName(courseName) {
    return Course.find({
        name: courseName
    });
}

function getAllCourses() {
    return Course.list();
}


module.exports = {
    addStudentToCourse,
    getAllCourses,
    getCourseById,
    getCourseByName,
    createNewCourse
}