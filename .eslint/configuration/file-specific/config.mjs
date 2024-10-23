import { rules } from "./rules.mjs";

const CONFIGURATIONS = [
	{
		name: "ts-consistent-type-exports",
		files: [
			"**/_index.mts",
		],
		ignores: [],
		rules: rules,
	}
];

export { CONFIGURATIONS as configurations };
