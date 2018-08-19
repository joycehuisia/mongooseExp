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
const Paragraph = new mongoose.model('Paragraph', {
    text: {
        type: String
    }
});

Paragraph.methods = {
    getText() {
        return this.text;
    }
}

/**
* Image Schema
*/

const Image = new mongoose.model('Image', {
    imageUrl: {
        type: String
    }
});

Image.methods = {
    getImage() {
        return this.imageUrl
    }
}

const HandOutSchema = Base.discriminator('HandOut', new mongoose.schema({
    contents: [{
        type: Schema.Types.Mixed,
        ref: 'Question,Paragraph,Image'
    }]
});

HandOutSchema.methods = {
    getHandOutInfo() {
        return this.contents;
    }
}

/**
 * @typedef Test
 */
module.exports = mongoose.model('Handout', HandOutSchema);