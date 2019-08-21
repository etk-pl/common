/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const {sleep} = require("./sleep");
const {timeout: _timeout} = require("./timeout");

async function retry(fn, args, thisArg = null, {retries = 5, delay = 1000, timeout = 5000} = {}) {
	retries = retries | 0;
	delay = delay | 0;
	timeout = timeout | 0;
	if (retries < 0) {
		retries = 0;
	}
	if (delay < 0) {
		delay = 0;
	}
	if (timeout < 0) {
		timeout = 0;
	}
	let last_error;
	do {
		try {
			const promises = [fn.apply(thisArg, args)];
			if (timeout) {
				promises.push(_timeout(timeout));
			}
			return await Promise.race(promises);
		} catch (e) {
			last_error = e;
			retries--;
			if (delay) {
				await sleep(delay);
			}
		}
	} while (retries > 0);
	throw last_error;
}

module.exports = {retry};
