import type { ModuleFormat } from "./ModuleFormat.mjs";

interface LoadContext
{
	conditions: Array<string>;
	format: ModuleFormat;
	importAssertions: Record<string, string>;
}

export type { LoadContext };
