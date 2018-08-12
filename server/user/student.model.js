const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    User = require('./user.model.js');

const StudentSchema = User.extend({
    scores: [{
        type: Number
    }],
    className: String
});

module.export = mongoose.model('Student', StudentSchema);