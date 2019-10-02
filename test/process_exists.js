"use strict";
const assert = require("assert");
const child_process = require("child_process");
const process_exists = require("../src/process_exists").process_exists;
describe("process_exists", function () {
	it("should return true when checking if process exists on created process", function () {
		const childProcess = child_process.spawn("tail", [
			"/dev/zero",
			"-f"
		]);
		assert.deepStrictEqual(process_exists(childProcess.pid), true);
		childProcess.kill();
	});
});