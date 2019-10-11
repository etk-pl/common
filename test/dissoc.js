"use strict";
const assert = require("assert");
const dissoc = require("../src/dissoc").dissoc;
describe("dissoc", function () {
	it("should return object without given key", function () {
		const testObj = {
			testKey1: "",
			testKey2: ""
		};
		assert.deepStrictEqual(dissoc("testKey1", testObj), {testKey2: ""});
	});
	it("should throw TypeError when called with undefined", function () {
		assert.throws(() => {
			dissoc("testKey1", undefined);
		}, TypeError);
	});
	it("should throw TypeError when called with null", function () {
		assert.throws(() => {
			dissoc("testKey1", null);
		}, TypeError);
	});
});