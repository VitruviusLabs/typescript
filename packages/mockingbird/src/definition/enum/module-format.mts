const enum ModuleFormat
{
	BUILT_IN = "builtin",
	COMMON_JS = "commonjs",
	// eslint-disable-next-line @ts/no-shadow -- This rule incorrectly applies to enum keys
	JSON = "json",
	MODULE = "module",
	WASM = "wasm",
}

export { ModuleFormat };
