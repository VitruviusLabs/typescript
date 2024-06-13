import { rules } from "./rules.mjs";

const CONFIGURATION = {
	name: "stylistic",
	files: [
		"**/*.mts",
	],
	ignores: [],
	rules: rules,
};

export { CONFIGURATION as configuration };
