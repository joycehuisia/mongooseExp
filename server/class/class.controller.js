const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');

function createClass(classInfo) {

}

function addClassToCourse(classId, courseId) {

}

//Get All Classes in the system
function getAllClasses() {

}

function getClassesByDate(date) {

}

function getClassesById(classId) {

}

//Get All Classes taught by a specific teacher
function getClassesByTeacher(teacherId) {

}

function getClassesByType(typeName) {

}

module.exports = {
    getAllClasses,
    getClassesByDate,
    getClassesById,
    getClassesByTeacher,
    getClassesByType
};
