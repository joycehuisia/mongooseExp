const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    User = require('./user.model.js');

const AdminSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    teachers: [{
        type: Schema.ObjectId,
        ref: "Teacher"
    }]
});

AdminSchema.methods = {}

AdminSchema.statics = {
    create(userId) {
        let admin = new this({
            userId: userId
        });

        return admin.save();
    }
}

module.exports = mongoose.model('Admin', AdminSchema);