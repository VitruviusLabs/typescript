import { rules } from "./rules.mjs";

const CONFIGURATION = {
	name: "strict",
	files: [
		"**/*.mts",
	],
	ignores: [],
	rules: rules,
};

export { CONFIGURATION as configuration };
