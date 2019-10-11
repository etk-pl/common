/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const assert = require("assert");
const O = require("../").object;
const ExtError = require("exterror");
describe("object", () => {
	const input = {
		a: 1,
		b: 2,
		c: 3,
		e: 4
	};
	const keys = Object.keys(input);
	describe("filter", function () {
		it("should return object with values that aren't even", () => {
			assert.deepStrictEqual(O.filter(input, (value, key, object) => keys.includes(key) && object === input && value % 2), {
				a: 1,
				c: 3
			});
		});
		checkForInvalidTypes("filter");
	});
	describe("map", function () {
		it("map", () => {
			assert.deepStrictEqual(O.map(input, (value, key, object) => keys.includes(key) && object === input && value * 2), {
				a: 2,
				b: 4,
				c: 6,
				e: 8
			});
		});
		checkForInvalidTypes("map");
	});
	describe("find", function () {
		it("find", () => {
			assert.deepStrictEqual(O.find(input, (value, key, object) => value === 2 && key === "b" && object === input), [
				"b",
				2
			]);
		});
		checkForInvalidTypes("find");
	});
	describe("forEach", function () {
		it("forEach", () => {
			const entries = [];
			O.forEach(input, (value, key, object) => keys.includes(key) && object === input && entries.push([
				key,
				value
			]));
			assert.deepStrictEqual(entries, Object.entries(input));
		});
		checkForInvalidTypes("forEach");
	});
});

function checkForInvalidTypes(method) {
	it("should throw ExtError when called with object param that is null", function () {
		assert.throws(() => {
			O[method](null, () => {
			});
		}, ExtError);
	});
	it("should throw TypeError when called with object param that is undefined", function () {
		assert.throws(() => {
			O[method](undefined, () => {
			});
		}, ExtError);
	});
	it("should throw ExtError when called without callback", function () {
		assert.throws(() => {
			O[method](Object.keys({
				a: 1,
				b: 2,
				c: 3,
				e: 4
			}));
		}, TypeError);
	});
	it("should throw ExtError when called without params", function () {
		assert.throws(() => {
			O[method]();
		}, ExtError);
	});
	it("should throw ExtError when called with object param that is number", function () {
		assert.throws(() => {
			O[method](123, () => {
			});
		}, ExtError);
	});
}