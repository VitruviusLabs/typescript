const enum ModuleFormat
{
	BUILT_IN = "builtin",
	COMMON_JS = "commonjs",
	// eslint-disable-next-line @typescript-eslint/no-shadow -- This rule incorrectly applies to enum keys
	JSON = "json",
	MODULE = "module",
	WASM = "wasm",
}

export { ModuleFormat };
