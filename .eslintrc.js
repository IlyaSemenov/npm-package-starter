module.exports = {
	root: true,
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["simple-import-sort"],
	rules: {
		"prettier/prettier": "warn",
		"simple-import-sort/sort": "warn",
	},
}
