/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
module.exports = {
	/**
	 *
	 * @param object
	 * @param callback
	 * @returns {Object}
	 */
	filter: function (object, callback) {
		const result = {};
		traverse(object, (value, key, object) => {
			if (callback(value, key, object)) {
				result[key] = value;
			}
		});
		return result;
	},
	/**
	 *
	 * @param object
	 * @param callback
	 * @returns {*}
	 */
	find: function (object, callback) {
		let result = undefined;
		traverse(object, (value, key, object) => {
			if (callback(value, key, object)) {
				result = [
					key,
					value
				];
				return true;
			}
		});
		return result;
	},
	/**
	 *
	 * @param object
	 * @param callback
	 */
	forEach: function (object, callback) {
		traverse(object, (value, key, object) => void callback(value, key, object));
	},
	/**
	 *
	 * @param object
	 * @param callback
	 * @returns {Object}
	 */
	map: function (object, callback) {
		const result = {};
		traverse(object, (value, key, object) => {
			result[key] = callback(value, key, object);
		});
		return result;
	}
};

/**
 *
 * @param object
 * @param callback
 */
function traverse(object, callback) {
	const entries = Object.entries(object);
	const length = entries.length;
	for (let i = 0; i < length; i++) {
		if (callback(entries[i][1], entries[i][0], object)) {
			break;
		}
	}
}