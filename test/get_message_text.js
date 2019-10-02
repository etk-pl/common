"use strict";
const assert = require("assert");
const get_message_text = require("../src/get_message_text").get_message_text;
const ExtError = require("exterror");
describe("get_message_text", function () {
	it("should return string wih message from file", function () {
		const message_text = get_message_text("pl", "test");
		return message_text("testType", "messageTest.txt", "pl", {}).then((result) => {
			assert.deepStrictEqual(result, "TEST MESSAGE");
		});
	});
	it("should return ExtError wih wrong message file name", function () {
		const message_text = get_message_text("pl", "test");
		assert.rejects(message_text("testType", "wrongFile.txt", "pl", {}), ExtError);
	});
	it("should return TypeError when calling get_message_text without params", function () {
		const message_text = get_message_text();
		assert.rejects(message_text("testType", "messageTest.txt", "pl", {}), TypeError);
	});
	it("should return TypeError when calling get_message_text with base_path param of type other than string", function () {
		const message_text = get_message_text("pl", false);
		assert.rejects(message_text("testType", "messageTest.txt", "pl", {}), TypeError);
	});
});