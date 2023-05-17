import { type ModuleFormat } from "./ModuleFormat.mjs";

interface ResolveResult
{
	shortCircuit: boolean | undefined;
	url: string;
	format: ModuleFormat | null | undefined;
	importAssertion?: Record<string, string>;
}

export type { ResolveResult };
