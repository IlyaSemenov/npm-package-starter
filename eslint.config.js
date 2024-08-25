import config from "@antfu/eslint-config"
import simpleImportSort from "eslint-plugin-simple-import-sort"

export default config(
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    stylistic: {
      quotes: "double",
    },
    rules: {
      // always add if { ... } braces
      "curly": ["error", "all"],
      // allow console.log
      "no-console": "warn",
      // allow arrays [, a]
      "no-sparse-arrays": "off",
      // allow string + string
      "prefer-template": "off",
      // sort imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/order": "off",
      "sort-imports": "off",
      // place if { in same line
      "style/brace-style": ["error", "1tbs"],
      // allow both it() and test()
      "test/consistent-test-it": "off",
      // allow @ts-ignore
      "ts/ban-ts-comment": "off",
      // allow types instead of interfaces
      "ts/consistent-type-definitions": "off",
      // allow interace method as arrow fn
      "ts/method-signature-style": "off",
    },
  },
)
