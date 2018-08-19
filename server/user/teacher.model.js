const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TeacherSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    classes: [{
        type: Schema.ObjectId,
        ref: 'Class'
    }]
});

TeacherSchema.methods = {
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

TeacherSchema.statics = {
    create(userId) {
        let teacher = new this({
            userId: userId
        });

        return teacher.save();
    }
}

module.exports = mongoose.model('Teacher', TeacherSchema);