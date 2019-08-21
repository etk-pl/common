/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
module.exports = {timeout: (t, e) => new Promise((_, r) => setTimeout(() => r(e | new Error("Timeout after " + t + "ms")), t).unref())};
