/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
module.exports = {sleep: t => new Promise(r => setTimeout(r, t).unref())};
