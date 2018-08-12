const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../constant/constant');

/**
 * Test Schema
 */
const baseSchema = new mongoose.Schema({
    student: [{
        type: Schema.ObjectId,
        ref: 'Student'
    }],
    materialType: {
        type: String,
        enum: Object.values(constants.materialType)
    }
}, {
    discriminatorKey: "material"
});

baseSchema.statics = {
    getAllHandOuts() {
        return this.find({
            materialType: constants.materialType.HANDOUT
        }).exec();
    }

    getAllQuizes() {
        return this.find({
            materialType: constants.materialType.QUIZ
        })
    }
}

/**
 * @typedef Base
 */
module.exports = mongoose.model('Base', baseSchema);