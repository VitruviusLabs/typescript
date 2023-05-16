import type { ModuleFormat } from "./ModuleFormat.js";

interface LoadContext
{
	conditions: Array<string>;
	format: ModuleFormat;
	importAssertions: Record<string, string>;
}

export type { LoadContext };
