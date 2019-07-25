/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";
module.exports = "dissoc,get_message_text,get_ses_send_email,object,process_exists,regexp_escape,sha,tr".split(",").reduce((o, v) => ({...require("./src/" + v), ...o}), {});
