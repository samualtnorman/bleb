import { assert } from "@samual/lib/assert"

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
