# Common
```typescript
/**
 * Create object copy without key
 * @param key - Key to be removed
 * @param object - Target object
 * @returns New object without specified key
 */
export function dissoc(key: string, object: Object): Object;

/**
 *
 * @param type
 * @param name
 * @param lang
 * @param params
 * @returns {Promise<string,ExtError>}
 */
export function get_message_text(type: string, name: string, lang: string, params: Object): Promise<string>;

/**
 *
 * @param {SES} ses
 * @returns {send_email}
 */
export function get_ses_send_email(ses: SES): Function;

/**
 *
 * @param {string} string
 * @returns {string}
 * @link https://stackoverflow.com/a/30851002/5361130
 */
export function regexp_escape(string: string): string;

/**
 * @param {Object} options
 * @param {string} options.to
 * @param {string} options.from
 * @param {string} options.subject
 * @param {string} options.body
 * @param {string} options.reply_to
 * @param {string} [options.charset=default_charset]
 * @returns {Promise<*>}
 */
export function send_email(options: SendEmailOptions)

export function sha1(data: string): string;

export function sha224(data: string): string;

export function sha256(data: string): string;

export function sha384(data: string): string;

export function sha512(data: string): string;

/**
 *
 * @param string
 * @param params
 * @returns {string}
 */
export function tr(string: string, params?: Object): string;
```