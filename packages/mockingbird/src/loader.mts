import { readFile } from "node:fs/promises";

import { fileURLToPath } from "node:url";

import { ModuleFormat } from "./Type/ModuleFormat.mjs";

import { prefix } from "./prefix.mjs";

import { decodeInfos } from "./utils/MockingInfos.mjs";

import { buildCause } from "./utils/buildCause.mjs";

import { convertSource } from "./utils/convertSource.mjs";

import type { LoadContext } from "./Type/LoadContext.mjs";

import type { LoadResult } from "./Type/LoadResult.mjs";

import type { MockingInfos } from "./Type/MockingInfos.mjs";

import type { NextLoad } from "./Type/NextLoad.mjs";

import type { NextResolve } from "./Type/NextResolve.mjs";

import type { ResolveContext } from "./Type/ResolveContext.mjs";

import type { ResolveResult } from "./Type/ResolveResult.mjs";

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

async function load(module_identifier: string, context: LoadContext, next_load: NextLoad): Promise<LoadResult>
{
	if (!module_identifier.startsWith(prefix))
	{
		return await next_load(module_identifier, context);
	}

	const INFOS: MockingInfos = decodeInfos(module_identifier.slice(prefix.length));

	let source: string | undefined = undefined;

	try
	{
		source = (await readFile(fileURLToPath(INFOS.moduleIdentifier))).toString("utf-8");
	}
	catch (error: unknown)
	{
		throw new Error(`Unable to retrieve module ${INFOS.moduleIdentifier}.`, buildCause(error));
	}

	source = convertSource(source, INFOS);

	return {
		shortCircuit: true,
		format: ModuleFormat.MODULE,
		source: source,
	};
}

export { load, resolve };
