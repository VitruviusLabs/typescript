import { ModuleFormat } from "../definition/enum/module-format.mjs";
import { prefix } from "../utils/prefix.mjs";
import type { NextResolve } from "../definition/type/next-resolve.mjs";
import type { ResolveContext } from "../definition/interface/resolve-context.mjs";
import type { ResolveResult } from "../definition/interface/resolve-result.mjs";

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
