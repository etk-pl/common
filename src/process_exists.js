/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
module.exports = {
	process_exists: function (pid) {
		try {
			return process.kill(pid, 0);
		} catch (e) {
			return e.code !== "ESRCH";
		}
	}
};
