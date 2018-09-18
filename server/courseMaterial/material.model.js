const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../constant/constant');

/**
 * Test Schema
 */
const materialSchema = new mongoose.Schema({
    student: [{
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        },
        name: {
            type: String
        }
    }],
    class: [{
        classId: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        name: {
            type: String
        }
    }],
    materialType: {
        type: String,
        enum: Object.values(constants.materialType)
    },
    contents: [{
        infoType: {
            type: String,
            enum: "Question,Image,Text"
        },
        imageUrl: {
            type: String
        },
        text: {
            type: String
        },
        question: {
            type: String
        },
        answerType: {
            type: String,
            enum: "Multiple,Text"
        },
        answerChoice: [{
            choiceType: {
                type: String,
                enum: "Image,Text"
            },
            choiceUrl: {
                type: String
            },
            choiceText: {
                type: String
            }
        }],
        correctAnswer: {
            type: String
        }
    }],
    date: {
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    },
    score: {
        type: Number
    }
});

materialSchema.statics = {
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
module.exports = mongoose.model('Material', materialSchema);