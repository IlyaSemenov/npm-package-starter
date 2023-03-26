import { square } from "mylib"
import { expect, test } from "vitest"

test("it works", () => {
	expect(square(3)).toBe(9)
	expect(square(-5)).toBe(25)
})
