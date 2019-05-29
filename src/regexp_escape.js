/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";

/**
 *
 * @param {string} string
 * @returns {string}
 * @link https://stackoverflow.com/a/30851002/5361130
 */
function regexp_escape(string) {
	return string.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, "\\$&");
}

module.exports = {regexp_escape};
