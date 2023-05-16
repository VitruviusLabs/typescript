interface ResolveContext
{
	conditions: Array<string>;
	importAssertion: Record<string, string>;
	parentUrl: string | undefined;
}

export type { ResolveContext };
