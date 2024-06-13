import typescript_eslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";

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
		"@typescript": typescript_eslint.plugin,
		"@stylistic": stylistic,
		"@perfectionist": perfectionist,
	},
	settings: {},
};

export { CONFIGURATION as configuration };
