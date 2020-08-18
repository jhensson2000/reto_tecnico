'use strict'

const config = require('../config/default');

var setRequest = (method, headers, body, url) => {
    var options = {
        method: method,
        url: url,
        headers,
        body,
        json: true
    };
    return options;
};
exports.setRequest = setRequest;

var setHeaderAPIM = () => {
    var headers = {
        'Content-Type': config.CONTENT_TYPE
    };
    return headers;
}
exports.setHeaderAPIM = setHeaderAPIM;