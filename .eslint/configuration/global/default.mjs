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
		"@ts": typescript_eslint.plugin,
		"@style": stylistic,
	},
	settings: {},
};

export { CONFIGURATION as configuration };
