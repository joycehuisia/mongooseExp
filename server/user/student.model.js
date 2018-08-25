const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    User = require('./user.model.js');

const StudentSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    classes: [{
        type: Schema.ObjectId,
        ref: 'Class'
    }],
    courses: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    }]
});

StudentSchema.methods = {
    addClass(classId) {
        this.classes.push(classId);
        return this.save({
            classes: this.classes
        });
    },

    removeClass(classId) {
        this.classes.splice(this.classes.indexOf(classId));
        return this.save({
            classes: this.classes
        });
    }
}

StudentSchema.statics = {
    create(userId) {
        let student = new this({
            userId: userId
        });

        return student.save();
    }
}

module.exports = mongoose.model('Student', StudentSchema);