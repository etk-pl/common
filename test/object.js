/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const assert = require("assert");
const O = require("../src/object");
describe("object", () => {
	it("filter", () => {
		const input = {
			a: 1,
			b: 2,
			c: 3,
			e: 4
		};
		assert.deepStrictEqual(O.filter(input, (value) => value % 2), {
			a: 1,
			c: 3
		});
	});
	it("map", () => {
		const input = {
			a: 1,
			b: 2,
			c: 3,
			e: 4
		};
		assert.deepStrictEqual(O.map(input, (value) => value * 2), {
			a: 2,
			b: 4,
			c: 6,
			e: 8
		});
	});
	it("find", () => {
		const input = {
			a: 1,
			b: 2,
			c: 3,
			e: 4
		};
		assert.deepStrictEqual(O.find(input, (value) => value === 2), [
			"b",
			2
		]);
	});
	it("forEach", () => {
		const input = {
			a: 1,
			b: 2,
			c: 3,
			e: 4
		};
		const entries = [];
		O.forEach(input, (value, key) => entries.push([
			key,
			value
		]));
		assert.deepStrictEqual(entries, Object.entries(input));
	});
});