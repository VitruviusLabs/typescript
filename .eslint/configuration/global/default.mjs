import typescript_eslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

/* Default configuration with plugins */
const CONFIGURATION = {
	name: "default",
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		globals: {},
		parser: typescript_eslint.parser,
		parserOptions: {
			project: true,
		},
	},
	linterOptions: {
		noInlineConfig: false,
		reportUnusedDisableDirectives: "warn",
	},
	plugins: {
		"@typescript-eslint": typescript_eslint.plugin,
		"@stylistic": stylistic,
		"@stylistic/js": stylistic,
		"@stylistic/ts": stylistic,
	},
	settings: {},
};

export { CONFIGURATION as configuration };
