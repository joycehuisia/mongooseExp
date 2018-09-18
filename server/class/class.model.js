const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    constants = require('../constant/constant');

const ClassSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
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
        id: {
            type: Schema.Types.ObjectId
        },
        type: {
            type: String,
            ref: 'baseMaterial.materialType'
        }
    }],
    subject: [{
        type: String,
        enum: Object.values(constants.subjects)
    }],
    courses: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    }]
});

ClassSchema.methods = {
    addMaterial(materialId) {

    }
}

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
    },

    addCourseToClass(classList, courseId) {
        let query = {
            _id: {
                $in: classList
            }
        }, params = {
            $push: {
                courses: [{
                    id: courseObject.id
                }]
            }
        };
        return this.update(query, params);
    }

}

/**
 * @typedef Class
 */
module.exports = mongoose.model('Class', ClassSchema);