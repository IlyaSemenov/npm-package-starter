import { describe, expect, test } from "bun:test"
import { square } from "../src/index"

describe("square", () => {
  test("works", () => {
    expect(square(3)).toBe(9)
    expect(square(-5)).toBe(25)
  })
})
