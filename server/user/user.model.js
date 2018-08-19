const Promise = require('bluebird');
const crypto = require('crypto');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const constants = require('../constant/constant');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
    userType: {
        type: String,
        default: constants.userTypes.STUDENT,
        enum: Object.values(constants.userTypes)
    },
    username: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        select: false
    },
    hash: {
        type: String,
        select: false
    },
    mobileNumber: {
        type: String,
        required: false,
        match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    locked: {
        type: Boolean,
        default: false,
        select: false
    },
    loginAttempts: {
        type: Number,
        default: 0,
        select: false
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.methods = {
    incrementLock() {
        return this.save({
            loginAttepts: ++this.loginAttempts
        }).then(function(user) {
            if (user.loginAttempts === 5) {
                user.lock();
            }
            return user.loginAttempts;
        });
    },

    isLocked() {
        return this.locked === true;
    },

    lock() {
        this.save({
            locked: true
        });
    },

    setPassword(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
    },

    verifyPassword(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
        return this.hash === hash;
    },

    unlock() {
        return this.save({
            loginAttempts: 0,
            locked: false
        }).then((error) => { //Will only need error message if failed to unlock
            if(this.locked === false) {
                return true;
            }
            //TODO: system log the error
            return false;
        });
    }
}

/**
 * Statics
 */
UserSchema.statics = {
    createUser(username, password, type) {
        let user = new this({
            username: username,
            userType: type
        });

        user.setPassword(password);

        return user.save()
            .then((user) => {
                return {
                    id: user.id,
                    createdAt: user.createdAt,
                    userType: user.userType,
                    username: user.username,
                    mobileNumber: user.mobileNumber
                }
            });
    },

    getByUsername(username) {
        return this.findOne({
            username: username
        }).exec();
    },

    /**
     * Get user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({
        skip = 0,
        limit = 50
    } = {}) {
        return this.find()
            .sort({
                createdAt: -1
            })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);