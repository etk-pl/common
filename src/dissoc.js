/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
const dissoc = (key, {[key]: _, ...object}) => object;
module.exports = {dissoc};
