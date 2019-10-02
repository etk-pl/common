# Common
## dissoc(key, object)
Removes key from object
### Example usage
```js
const testObj = {
    testKey1: "",
    testKey2: ""
};
dissoc("testKey1", testObj);
```

## get_message_text(fallback_language, base_path)
Returns function that gets text from file

const message_text = get_message_text(fallback_language, base_path)
### message_text(type, name, lang, params)
Gets text from file that is in path like 'base_path/type/lang/name'
### Example usage
```js
const message_text = get_message_text("pl", "test");
//File path will be 'test/testType/pl/messageTest.txt'
message_text("testType", "messageTest.txt", "pl", {}).then((result) => {
	console.log(result);
});
```
##Object methods
###Object.filter(object, Callback)
###Object.map(object, Callback)
###Object.find(object, Callback)
###Object.forEach(object, Callback)

##process_exists(pid)
Checks if process with specified process id exists
###Example
```js
const childProcess = child_process.spawn("tail", [
  "/dev/zero",
  "-f"
]);
//returns true
console.log(process_exists(childProcess.pid));
```
##retry(function, args, thisArg, options)
###options = {retries, delay, timeout}
It tries to run function number of times specified in retries
###Example
```js
const fail = (o) => {
  if (o.count !== 3) {
    o.count++;
    throw errObj;
  }
  return o.count;
};

retry(fail, [{count: 1}], null, {
  retries: 3,
  delay: 50,
  timeout: 200
}).then((result) => {
  //result = 3
  console.log(result);
});
```

```typescript
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