/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const path = require("path");
const fs = require("fs");
const ExtError = require("exterror");
const {tr} = require("./tr");
/**
 *
 * @param {string} fallback_language
 * @param {string} base_path
 * @returns {function(string, string, string, Object): Promise<string>}
 */
module.exports = {
	get_message_text: function (fallback_language, base_path) {
		/**
		 *
		 * @param {string} type
		 * @param {string} name
		 * @param {string} lang
		 * @param {Object} params
		 * @returns {Promise<string>}
		 */
		function message_text(type, name, lang, params) {
			lang = lang || fallback_language;
			return new Promise((resolve, reject) => {
				const file = path.resolve(base_path, "./" + type + "/" + lang + "/" + name);
				fs.readFile(file, (err, data) => {
					if (err) {
						if (lang !== fallback_language) {
							return message_text(type, name, fallback_language, params).then(resolve).catch(reject);
						}
						return reject(new ExtError("ERR_UNABLE_TO_LOAD_MESSAGE_TEMPLATE", "Unable to load message template"));
					}
					resolve(tr(data.toString(), params));
				});
			});
		}

		return message_text;
	}
};