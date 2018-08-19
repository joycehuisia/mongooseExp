const Promise = require('bluebird');
const Course = require('./course.model');
const Student = require('../user/student.model');


function createNewCourse(courseName, coursePrice) {
    console.log(Course);
    return Course.createNewCourse(courseName, coursePrice);
}

function addStudentToCourse(courseId, studentList) {
    return Course.findOne({
            _id: courseId
        })
        .then((course) => {
            console.log("studentList");
            return Student.find({
                'userId': {
                    $in: studentList
                }
            }).then((response) => {
                //TODO: Temporary until mongoose can be fine tuned to only return userId
                var arr = [];
                for(i = 0; i < response.length; i++) {
                    arr.push(response[0].userId);
                }
                var notfound = studentList.filter(function(i) {
                    return studentList.indexOf(i) < 0
                });

                //Continue on this
            }).catch((response) => {
                console.log(response);
                return Promise.reject(response);
            });

        }).catch((error) => {
            return Promise.reject({
                error: "The selected course does not exist."
            });
        });
}

function getCourseById(courseId) {

}

function getCourseByName(courseName) {

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