const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    User = require('./user.model.js'),
    Teacher = require('./teacher.model.js');

const AdminSchema = User.extend({
    teachers: [{
        type: Schema.ObjectId,
        ref: Teacher
    }]
});

module.export = mongoose.model('Admin', AdminSchema);