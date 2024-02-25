import type { ModuleFormat } from "../enum/module-format.mjs";

interface ResolveResult
{
	format: ModuleFormat | null | undefined;
	importAssertion?: Record<string, string>;
	shortCircuit: boolean | undefined;
	url: string;
}

export type { ResolveResult };
