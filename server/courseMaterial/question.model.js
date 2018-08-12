const mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Schema = mongoose.Schema,
    constants = require('../constant/constant');

const QuestionSchema = new mongoose.Schema({
    questionType: [{
        type: Schema.ObjectId,
        enum: Object.values(constants.questionTypes)
    }],
    question: [{
        type: Schema.Types.Mixed,
        ref: "Image,Paragraph"
    }],
    answerChoices: [{
        type: String
    }]
});

QuestionSchema.method = {
    getQuestion() {
        return this.question;
    },

    getAnswers() {
        if(this.questionType === constants.questionTypes.MULTIPLE_CHOICE) {
            return this.answerChoices;
        }

        return [];
    }
}

module.export = mongoose.model('Question', QuestionSchema);