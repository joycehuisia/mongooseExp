const User = require('./user.model');

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

function create(username, password) {
    return User.createUser(username, password)
        .then((response) => {
            //TODO: make proper responses
            return response;
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
    console.log(req.query);

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


module.exports = {
    load,
    get,
    create,
    update,
    list,
    remove,
    getUserByUsername
};