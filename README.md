# Better LEB128
bleb

| Range             | bleb    | LEB128  |
|-------------------|---------|---------|
| 0 - 127           | 1 byte  | 1 byte  |
| 128 - 16383       | 2 bytes | 2 bytes |
| 16384 - 16511     | 2 bytes | 3 bytes |
| 16512 - 2097151   | 3 bytes | 3 bytes |
| 2097152 - 2113663 | 3 bytes | 4 bytes |
| ... |

## Encoding
### Basic Usage
```js
import * as Bleb from "bleb"

console.log(Bleb.fromBigInt(1000n)) // [ 232, 6 ]
```

## Decoding
### Basic Usage
```js
import * as Bleb from "bleb"

console.log(Bleb.toBigInt([ 232, 6 ])) // 1000n
```

### Less-Basic Usage
```js
import * as Bleb from "bleb"

// some data with bleb at byte offset 2
const u8View = new Uint8Array([ 177, 218, 232, 6, 197, 165, 75, 177 ])
const index = { $: 2 }

console.log(Bleb.toBigInt(u8View, index)) // 1000n
console.log(index) // { $: 4 }
```
