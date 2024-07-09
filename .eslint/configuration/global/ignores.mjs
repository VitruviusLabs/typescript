/* Ignored files for all configurations */
const CONFIGURATION = {
	ignores: [
		"**/*.js",
		"**/*.cjs",
		"**/*.mjs",
		"**/*.d.ts",
		"**/*.d.cts",
		"**/*.d.mts",
		"build",
		"reports",
		"tmp",
		".stryker-tmp",
		"**/test.mts"
	],
};

export { CONFIGURATION as configuration };
