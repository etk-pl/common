/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
/**
 *
 * @param {SES} ses
 * @returns {function({to: string, from: string, subject: string, body: string, reply_to?: string, charset?: string}): Promise<*>}
 */
module.exports = (ses) => {
	/**
	 * @param {Object} options
	 * @param {string} options.to
	 * @param {string} options.from
	 * @param {string} options.subject
	 * @param {string} options.body
	 * @param {string} options.reply_to
	 * @param {string} [options.charset="UTF-8"]
	 * @returns {Promise<*>}
	 */
	return function send_email({to, from, subject, body, reply_to, charset = "UTF-8"}) {
		return new Promise((resolve, reject) => {
			const data = {
				Destination: {ToAddresses: [to]},
				Message: {
					Body: {
						Html: {
							Data: body,
							Charset: charset
						}
					},
					Subject: {
						Data: subject,
						Charset: charset
					}
				},
				Source: from
			};
			if (typeof reply_to === "string" && reply_to.length !== 0) {
				data.ReplyToAddresses = [reply_to];
			}
			return ses.sendEmail(data, (error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			});
		});
	};
};