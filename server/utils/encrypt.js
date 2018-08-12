const crypto = require("crypto-js");
const config = require("../../config/config");

module.exports = {

    encryptString: function(value) {
        return crypto.HmacSHA1(value, config.hashSecret);
    }

}