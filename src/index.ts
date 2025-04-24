import { assert } from "@samual/lib/assert"

/**
 * @example Basic Usage
 * ```ts
 * import * as Bleb from "bleb"
 *
 * console.log(Bleb.fromBigInt(1000n)) // [ 232, 6 ]
 * ```
 */
export function fromBigInt(integer: bigint): number[] {
	const result: number[] = []

	while (integer >= 0n) {
		let value = Number(integer & 0x7Fn)

		integer >>= 7n

		if (integer--)
			value |= 0x80

		result.push(value)
	}

	return result
}

/**
 * @example Basic Usage
 * ```ts
 * import * as Bleb from "bleb"
 *
 * console.log(Bleb.toBigInt([ 232, 6 ])) // 1000n
 * ```
 *
 * @example Less-Basic Usage
 * ```ts
 * import * as Bleb from "bleb"
 *
 * // some data with bleb at byte offset 2
 * const u8View = new Uint8Array([ 177, 218, 232, 6, 197, 165, 75, 177 ])
 * const index = { $: 2 }
 *
 * console.log(Bleb.toBigInt(u8View, index)) // 1000n
 * console.log(index) // { $: 4 }
 * ```
 */
export function toBigInt(data: Record<number, number>, index: { $: number } = { $: 0 }): bigint {
	let result = 0n
	let offset = 0n

	while (true) {
		const byte = data[index.$++]

		assert(byte != undefined, HERE)
		result += ((BigInt(byte) & 0x7Fn) + (offset && 1n)) << offset
		offset += 7n

		if (!(byte & 0x80))
			return result
	}
}
