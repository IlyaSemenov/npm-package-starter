import { defineConfig } from "tsdown"

export default defineConfig({
  format: ["cjs", "esm"],
  attw: {
    profile: "strict",
  },
})
