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
        type: Schema.ObjectId,
        ref: 'Student'
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
        this.students.push(...studentId);
        return this.save({
            students: this.students
        });
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