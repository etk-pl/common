/**
 * Create object copy without key
 * @param key - Key to be removed
 * @param object - Target object
 * @returns New object without specified key
 */
export function dissoc(key: string, object: object): object;

/**
 *
 * @returns {Promise<string>}
 * @param fallback_language
 * @param base_path
 */
export function get_message_text(fallback_language: string, base_path: string): (type: string, name: string, lang: string, params: object) => Promise<string>;

/**
 *
 * @param {SES} ses
 * @returns {send_email}
 */
export function get_ses_send_email(ses: SES): (options: SendEmailOptions) => Promise<string>;

/**
 *
 * @param {string} string
 * @returns {string}
 * @link https://stackoverflow.com/a/30851002/5361130
 */
export function regexp_escape(string: string): string;

/**
 * @param {object} options
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
export function tr(string: string, params?: object): string;

declare class SES {
    sendEmail(data: object, callback): null
}

interface SendEmailOptions {
    to: string;
    from: string;
    subject: string;
    body: string;
    reply_to: string;
    charset?: string;
}