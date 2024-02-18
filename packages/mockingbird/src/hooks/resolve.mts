import { ModuleFormat } from "../Type/ModuleFormat.mjs";

import { prefix } from "../utils/prefix.mjs";

import type { NextResolve } from "../Type/NextResolve.mjs";

import type { ResolveContext } from "../Type/ResolveContext.mjs";

import type { ResolveResult } from "../Type/ResolveResult.mjs";

function resolve(module_identifier: string, context: ResolveContext, next_resolve: NextResolve): ResolveResult
{
	if (module_identifier.startsWith(prefix))
	{
		return {
			shortCircuit: true,
			url: module_identifier,
			format: ModuleFormat.MODULE,
		};
	}

	return next_resolve(module_identifier, context);
}

export { resolve };
