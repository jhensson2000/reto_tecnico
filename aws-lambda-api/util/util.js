'use strict'
exports.isEmpty = (value) => {
    if (value === undefined || value === null || value === "") {
        return true;
    }
    return false;
}