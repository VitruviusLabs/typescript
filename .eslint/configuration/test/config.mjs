import { rules } from "./rules.mjs";

const CONFIGURATION = {
	name: "test",
	files: [
		"*.spec.mts",
		"test/**/*.mts",
		"mock/**/*.mts",
	],
	ignores: [],
	rules: rules,
};

export { CONFIGURATION as configuration };
