const enum ModuleFormat
{
	BUILT_IN = "builtin",
	COMMON_JS = "commonjs",
	// eslint-disable-next-line @typescript-eslint/no-shadow -- This rule ignore edge cases.
	JSON = "json",
	MODULE = "module",
	WASM = "wasm",
}

export { ModuleFormat };
