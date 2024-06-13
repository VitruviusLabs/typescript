import { rules } from "./rules.mjs";

const CONFIGURATION = {
	name: "src",
	files: [
		"*.spec.mts",
		"test/**/*.mts",
	],
	ignores: [],
	rules: rules,
};

export { CONFIGURATION as configuration };
