const Promise = require('bluebird');
const Course = require('./course.model');
const Student = require('../user/student.model');
const User = require('../user/user.model');
const mongoose = require('mongoose');
const Class = require('../class/class.model');


function createNewCourse(courseName, coursePrice) {
    return Course.createNewCourse(courseName, coursePrice);
}

function addStudentToCourse(courseId, studentList) {

    return Course.getCourseById(courseId)
        .then((course) => {
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

function addClassesToCourse(courseId, classIds) {

    return Course.getCourseById(courseId)
        .then((course) => {
            return course.addClass(classIds);
        }).then((response) => {
            return Class.addCourseToClass(classIds, courseId);
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
    addClassesToCourse,
    addStudentToCourse,
    getAllCourses,
    getCourseById,
    getCourseByName,
    createNewCourse
}