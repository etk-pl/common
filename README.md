# Common
```typescript
/**
 * Create object copy without key
 * @param key - Key to be removed
 * @param object - Target object
 * @returns New object without specified key
 */
function dissoc(key: string, object: Object): Object;

function sha1(data: string): string;

function sha224(data: string): string;

function sha256(data: string): string;

function sha384(data: string): string;

function sha512(data: string): string;

function regexp_escape(string: string): string;
```