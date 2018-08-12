const mongoose = require('mongoose');
const constants = require('../constant/constant');

/**
 * User Schema
 */
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classes: [{
        type: Schema.ObjectId,
        ref: 'Class'
    }]
});

CourseSchema.methods = {
    getClasses() {
        return this.classes;
    },

    getName() {
        return this.name;
    }
}

CourseSchema.statics = {

    list({
        sortOption = 0,
        sortDirection = 1,
        limit = 50
    } = {}) {

        let sortParams = {};

        switch(sortOption) {
            case constants.sortOptions.TITLE:
                sortParams.name = sortDirection;
                break;
            case constants.sortOptions.ID:
            default:
                break;
        }

        return this.find()
            .sort(sortParams)
            .limit(+limit)
            .exec();

    },

    getCourseById(courseId) {
        return this.find({
            _id: courseId
        }).exec();
    }
}

/**
 * @typedef Course
 */
module.exports = mongoose.model('Course', CourseSchema);