const User = require('./user.model');
const Student = require('./student.model');
const Teacher = require('./teacher.model');
const Admin = require('./admin.model');
const Parent = require('./parent.model');
const constants = require('../constant/constant');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
    return res.json(req.user);
}

function getAllStudents() {
    return Student.find();
}

function create(username, password, firstName, lastName, userType) {
    let type,
        userTypes = constants.userTypes,
        userObject,
        typeObject;

    if(!userTypes) {
        return Promise.reject({
            error: "No user type found"
        });
    }

    return User.getByUsername(username)
        .then((response) => {
            //if(response) {
            if(false) {
                return Promise.reject({
                    error: "This username is no longer available. Please select another username and try again"
                });
            }

            return User.createUser(username, password, firstName, lastName, userType);
        }).then((response) => {
            //TODO: make proper responses
            userObject = response;
            switch(userType) {
                case userTypes.STUDENT:
                    type = Student;
                    break
                case userTypes.TEACHER:
                    type = Teacher;
                    break;
                case userTypes.PARENT:
                    type = Parent;
                    break;
                case userTypes.ADMIN:
                    type = Admin;
                    break;
                default:
                    break;
            }

            return type.create(userObject.id);
        }).then((user) => {
            typeObject = user;
            return userObject.setReference(user.id);
        }).then((response) => {
            var newObject = {...typeObject.toObject(), ...userObject.toObject()};
            delete newObject.id; //remove the id from the userObject model as we are only using the one from the submodel
            return newObject;
        });
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
    const user = req.user;
    user.username = req.body.username;
    user.mobileNumber = req.body.mobileNumber;

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
    const {
        limit = 50, skip = 0
    } = req.query;
    User.list({
            limit,
            skip
        })
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
    const user = req.user;
    user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
}

function getUserByUsername(req, res) {
    if (req.query.username) {
        User.getByUsername(req.query.username)
            .then(function(user) {
                user = user.login(req.query.password);                
                if(user) {
                    res.json({
                        user: user
                    })
                } else {
                    res.json({
                        error: "user not found"
                    })
                }
            });
    } else {
        res.json({
            "error": "no user found"
        })
    }
}

function unlock(username) {
    return User.findOne({username: username})
        .then((user) => {
            return user.unlock();
        });
}

module.exports = {
    load,
    get,
    create,
    update,
    list,
    remove,
    getAllStudents,
    getUserByUsername,
    unlock
};