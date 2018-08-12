const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    User = require('./user.model.js');

const ParentSchema = User.extend({
    children: [{
        type: Schema.ObjectId,
        ref: 'Student'
    }],
    name: String
});

module.export = mongoose.model('Parent', ParentSchema);