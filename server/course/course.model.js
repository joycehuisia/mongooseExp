const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../constant/constant');

/**
 * Course Schema
 */
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: [{
        curr: {
            type: String,
            enum: Object.values(constants.currency)
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    classes: [{
        type: Schema.ObjectId,
        ref: 'Class'
    }],
    students: [{
        id: {
            type: Schema.ObjectId,
            ref: 'Student'
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    }]
});

CourseSchema.methods = {
    getClasses() {
        return this.classes;
    },

    getName() {
        return this.name;
    },

    addStudents(studentId) {
        let students = [];
        for(var i = 0; i < studentId.length; i++) {
            students.push({
                id: studentId[0]
            });
        }
        var params = {
            $push: {
                students: students
            }
        }
        return this.update(params);
    }
}

CourseSchema.statics = {

    createNewCourse(name, price) {
        let course = new this({
            name: name,
            price: price
        });

        return course.save();
    },

    getCourseById(courseId) {
        return this.find({
            _id: courseId
        }).exec();
    },

    
    list({
        limit = 50
    } = {}) {
        return this.find()
            .limit(+limit)
            .exec();
    }
}

/**
 * @typedef Course
 */
module.exports = mongoose.model('Course', CourseSchema);