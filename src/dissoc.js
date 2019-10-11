/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
/**
 * Create object copy without key
 * @param {string} key - Key to be removed
 * @param {object} object - Target object
 * @returns {object} New object without specified key
 */

const dissoc = (key, {[key]: _, ...object}) => object;
module.exports = {dissoc};