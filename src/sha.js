/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const crypto = require("crypto");
module.exports = "1,224,256,384,512".split(",").reduce((o, v) => ({
	["sha" + v]: function (data) {
		return crypto.createHash("sha" + v).update(data).digest("hex");
	}, ...o
}), {});
