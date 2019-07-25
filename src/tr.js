/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const {regexp_escape} = require("./regexp_escape");

/**
 *
 * @param {string} string
 * @param {Object} params
 * @returns {string}
 */
function tr(string, params) {
	return "" + Object.entries(params).reduce((string, [key, value]) => string.replace(new RegExp(regexp_escape(`{${key}}`), "gi"), value), string);
}

module.exports = {tr};
