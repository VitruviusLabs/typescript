import type { Environment } from "../Environment.mjs";

type EnvironmentPropertyInterface<
	A extends string,
	EnvironmentClass = typeof Environment,
	GetterName = `Get${A}`
> = GetterName extends keyof EnvironmentClass
	? EnvironmentClass[GetterName] extends () => infer R
		? [A, R]
		: never
	: never;

export type { EnvironmentPropertyInterface };
