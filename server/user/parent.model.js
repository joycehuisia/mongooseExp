const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ParentSchema =  new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    children: [{
        type: Schema.ObjectId,
        ref: 'Student'
    }],
    name: String
});

ParentSchema.methods = {
    addChild(childId) {
        this.children.push(childId);
        return this.save({
            children: this.children
        });
    },

    removeChild(childId) {
        this.children.splice(this.children.indexOf(childId));
        return this.save({
            children: this.children
        });
    }
}

ParentSchema.statics = {
    create(userId) {
        let parent = new this({
            userId: userId
        });

        return parent.save();
    }
}

module.exports = mongoose.model('Parent', ParentSchema);
