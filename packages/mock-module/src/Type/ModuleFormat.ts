const enum ModuleFormat
	{
	BUILT_IN = "builtin",
	COMMON_JS = "commonjs",
	// eslint-disable-next-line @typescript-eslint/no-shadow -- This rule seems bugged as this is not a case of shadowing.
	JSON = "json",
	MODULE = "module",
	WASM = "wasm",
}

export { ModuleFormat };
