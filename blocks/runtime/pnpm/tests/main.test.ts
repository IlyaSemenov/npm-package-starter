import { square } from "package-name"
import { describe, expect, it } from "vitest"

describe("square", () => {
  it("works", () => {
    expect(square(3)).toBe(9)
    expect(square(-5)).toBe(25)
  })
})
