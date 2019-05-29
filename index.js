/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
module.exports = "dissoc,regexp_escape,sha".split(",").reduce((o, v) => ({...require("./src/" + v), ...o}), {});
