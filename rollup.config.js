import cleaner from "rollup-plugin-cleaner"
import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"

export default [
	{
		input: "src/index.ts",
		output: {
			file: "dist/index.js",
			format: "cjs",
			sourcemap: true,
		},
		plugins: [cleaner({ targets: ["./dist/"] }), esbuild()],
	},
	{
		input: "src/index.ts",
		output: { file: "dist/index.d.ts", format: "es" },
		plugins: [dts()],
	},
]
