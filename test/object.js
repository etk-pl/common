/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const assert = require("assert");
const O = require("../").object;
describe("object", () => {
	const input = {
		a: 1,
		b: 2,
		c: 3,
		e: 4
	};
	const keys = Object.keys(input);
	it("filter", () => {
		assert.deepStrictEqual(O.filter(input, (value, key, object) => keys.includes(key) && object === input && value % 2), {
			a: 1,
			c: 3
		});
	});
	it("map", () => {
		assert.deepStrictEqual(O.map(input, (value, key, object) => keys.includes(key) && object === input && value * 2), {
			a: 2,
			b: 4,
			c: 6,
			e: 8
		});
	});
	it("find", () => {
		assert.deepStrictEqual(O.find(input, (value, key, object) => value === 2 && key === "b" && object === input), [
			"b",
			2
		]);
	});
	it("forEach", () => {
		const entries = [];
		O.forEach(input, (value, key, object) => keys.includes(key) && object === input && entries.push([
			key,
			value
		]));
		assert.deepStrictEqual(entries, Object.entries(input));
	});
});