const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    User = require('./user.model.js');

const TeacherSchema = User.extend({
    classes: [{
        type: Schema.ObjectId,
        ref: 'Class'
    }],
    students: [{
        type: Schema.ObjectId,
        ref: 'Student'
    }]
    schedule: [{
        class: {
            type: Schema.ObjectId,
            ref: 'Class'
        },
        date: {
            type: Date
        },
        time: {
            type: String
        }
    }]
});

module.export = mongoose.model('Teacher', TeacherSchema);