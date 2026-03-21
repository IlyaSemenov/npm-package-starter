import { describe, expect, it } from "bun:test"

import { square } from "package-name"

describe("square", () => {
  it("works", () => {
    expect(square(3)).toBe(9)
    expect(square(-5)).toBe(25)
  })
})
