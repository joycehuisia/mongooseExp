const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    constants = require('../constant/constant');

const ClassSchema = new Schema({
    students: [{
        type: Schema.ObjectId,
        ref: 'student'
    }],
    teacher: {
        type: Schema.ObjectId,
        ref: 'teacher'
    },
    name: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: Schema.Types.Mixed
    },
    materials: [{
        type: Schema.ObjectId,
        ref: 'baseMaterial.materialType'
    }],
    subject: [{
        type: String,
        enum: Object.values(constants.subjects)
    }]
});

ClassSchema.statics = {
    getAllClasses() {
        return this.find({}).exec();

    },

    getClassesByDate(date) {
        return this.find({
            date: date
        }).exec();
    },

    getClassesById(classId) {
        return this.find({
            _id: classId
        }).exec();
    },

    //Get All Classes taught by a specific teacher
    getClassesByTeacher(teacherId) {
        return this.find({
            teacher: teacherId
        }).exec();
    },

    getClassesByType(typeName) {
        return this.find({
            subject: typeName
        }).exec();
    }

}

/**
 * @typedef Class
 */
module.exports = mongoose.model('Class', ClassSchema);