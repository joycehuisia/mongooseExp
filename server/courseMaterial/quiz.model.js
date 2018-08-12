const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Schema = mongoose.Schema;
const Base = require("./baseMaterial");
const constants = require('../constant/constat');

/**
 * Test Schema
 */
const QuizSchema = Base.discriminator('Quiz', new mongoose.schema({
    questions: [{
        type: Schema.ObjectId,
        ref: 'Question'
    }],
    testDate: {
        start: {
            type: Date
        },
        end: {
            type: Date
        }
    },
    quizType: {
        type: String,
        enum: Object.values(constants.quizTypes)
    },
    score: {
        type: Number
    }
});

QuizSchema.methods = {
    getScore() {
        return this.score;
    },

    getTestDate() {
        return this.testDate
    },

    getQuestions() {
        return this.questions
    }
}

QuizSchema.static = {
    getQuizById(quizId) {
        return this.find({
            _id: quizId
        }).exec();
    },

    getQuizByStudentId(studentId) {
        return this.find({
            student: studentId
        }).exec();
    }
}

/**
 * @typedef Test
 */
module.exports = mongoose.model('Quiz', QuizSchema);