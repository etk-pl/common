/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const assert = require("assert");
const {retry, sleep} = require("../");
describe("retry", async () => {
	const ok = (o) => {
		o.c++;
		return "ok";
	};
	const fail = (o) => {
		o.c++;
		throw "fail";
	};
	const lazy = async (o) => {
		o.c++;
		await sleep(1000);
	};
	it("ok", async () => {
		const o = {c: 0};
		await retry(ok, [o]);
		assert.strictEqual(o.c, 1);
	});
	it("fail", async () => {
		const o = {c: 0};
		await assert.rejects(() => retry(fail, [o], null, {delay: 1}));
		assert.strictEqual(o.c, 5);
	});
	it("lazy timeout", async () => {
		const o = {c: 0};
		await assert.rejects(() => retry(lazy, [o], null, {
			delay: 0,
			timeout: 1
		}));
		assert.strictEqual(o.c, 5);
	});
	it("lazy timeout (throws instance of Error)", async () => {
		const o = {c: 0};
		await retry(lazy, [o], null, {
			delay: 0,
			timeout: 1
		}).then(() => Promise.reject(new Error("Should timeout"))).catch((err) => {
			assert(err instanceof Error, "Instance of Error");
		});
	});
});
