import config from "@antfu/eslint-config"

export default config(
	{
		stylistic: {
			indent: "tab",
			quotes: "double",
		},
		rules: {
			"curly": ["error", "all"],
			"import/order": ["error", {
				"newlines-between": "always",
				"distinctGroup": false,
				"alphabetize": {
					order: "asc",
					orderImportKind: "asc",
				},
			}],
			"no-console": "warn",
			"style/brace-style": ["error", "1tbs"],
			"style/no-tabs": ["error", { allowIndentationTabs: true }],
		},
	},
	{
		files: ["**/*.json"],
		rules: {
			// spaces instead of tabs
			"jsonc/indent": ["error", 2],
		},
	},
)
