/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const assert = require("assert");
const {retry, sleep} = require("../");
const ExtError = require("exterror");

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
	it("should return 3 after 2 retries", function () {
		const errObj = {
			code: "ERR_TEST_CODE",
			message: ""
		};
		const fail = (o) => {
			if (o.count !== 3) {
				errObj.message = "test error message" + o.count;
				o.count++;
				throw errObj;
			}
			return o.count;
		};
		return retry(fail, [{count: 1}], null, {
			retries: 3,
			delay: 50,
			timeout: 200
		}).then((result) => {
			assert.deepStrictEqual(result, 3);
		});
	});
	it("should throw ExtError with message from errObj", function () {
		const errObj = {
			code: "ERR_TEST_CODE",
			message: "ErrMessage"
		};
		const fail = async () => {
			throw errObj;
		};
		return assert.rejects(() => retry(fail, [], null, {
			retries: 5,
			delay: 50,
			timeout: 200
		}), (err) => {
			assert(err instanceof ExtError && err.message === "ErrMessage");
			return true;
		});
	});
	describe("Check types", function () {
		this.timeout(6000);
		describe("fn", function () {
			it("should throw Error when called with fn param is number", function () {
				return assert.rejects(() => retry(123, [], null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with fn param is undefined", function () {
				return assert.rejects(() => retry(undefined, [], null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with fn param is null", function () {
				return assert.rejects(() => retry(null, [], null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with fn param is string", function () {
				return assert.rejects(() => retry("test", [], null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with fn param is boolean", function () {
				return assert.rejects(() => retry(false, [], null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with fn param is object", function () {
				return assert.rejects(() => retry({}, [], null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with fn param is array", function () {
				return assert.rejects(() => retry([], [], null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
		});
		describe("args", function () {
			it("should throw Error when called with args param is number", function () {
				return assert.rejects(() => retry(ok, 123, null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with args param is undefined", function () {
				return assert.rejects(() => retry(ok, undefined, null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with args param is null", function () {
				return assert.rejects(() => retry(ok, null, null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with args param is string", function () {
				return assert.rejects(() => retry(ok, "hello", null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with args param is boolean", function () {
				return assert.rejects(() => retry(ok, true, null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with args param is object", function () {
				return assert.rejects(() => retry(ok, {}, null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
			it("should throw Error when called with args param is function", function () {
				return assert.rejects(() => retry(ok, function () {
				}, null, {
					retries: 1,
					delay: 0,
					timeout: 0
				}), (err) => {
					assert(err instanceof ExtError);
					return true;
				});
			});
		});
		describe("options", function () {
			const ok = () => {
				return "ok";
			};
			describe("retries", function () {
				it("should return 'ok' when called with retries is undefined", function () {
					return retry(ok, [], null, {
						retries: undefined,
						delay: 0,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with retries is object", function () {
					return retry(ok, [], null, {
						retries: {},
						delay: 0,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok'when called with retries is null", function () {
					return retry(ok, [], null, {
						retries: null,
						delay: 0,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with retries is string", function () {
					return retry(ok, [], null, {
						retries: "hello",
						delay: 0,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with retries is boolean", function () {
					return retry(ok, [], null, {
						retries: false,
						delay: 0,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with retries is function", function () {
					return retry(ok, [], null, {
						retries: function () {
						},
						delay: 0,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with retries is array", function () {
					return retry(ok, [], null, {
						retries: [],
						delay: 0,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
			});
			describe("delay", function () {
				it("should return 'ok' when called with delay is undefined", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: undefined,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok'when called with delay is null", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: null,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with delay is string", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: "asd",
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with delay is boolean", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: true,
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with delay is function", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: function () {
						},
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with delay is object", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: {},
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with delay is array", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: [],
						timeout: 0
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
			});
			describe("timeout", function () {
				it("should return 'ok' when called with timeout is undefined", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: 1,
						timeout: undefined
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with timeout is object", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: 1,
						timeout: {}
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok'when called with timeout is null", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: 1,
						timeout: null
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with timeout is string", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: 1,
						timeout: "asd"
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with timeout is boolean", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: 1,
						timeout: true
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with timeout is function", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: 1,
						timeout: function () {
						}
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
				it("should return 'ok' when called with timeout is array", function () {
					return retry(ok, [], null, {
						retries: 1,
						delay: [],
						timeout: []
					}).then((result) => {
						assert.deepStrictEqual(result, "ok");
					});
				});
			});
		});
	});
});
