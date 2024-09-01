import { rules } from "./rules.mjs";

const CONFIGURATION = {
	name: "disabled",
	files: [
		".disabled",
	],
	ignores: [],
	rules: rules,
};

export { CONFIGURATION as configuration };
