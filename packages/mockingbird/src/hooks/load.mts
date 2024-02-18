import { readFile } from "node:fs/promises";

import { fileURLToPath } from "node:url";

import { ModuleFormat } from "../Type/ModuleFormat.mjs";

import { decodeInfos } from "../utils/MockingInfos.mjs";

import { buildCause } from "../utils/buildCause.mjs";

import { convertSource } from "../utils/convertSource.mjs";

import { prefix } from "../utils/prefix.mjs";

import type { LoadContext } from "../Type/LoadContext.mjs";

import type { LoadResult } from "../Type/LoadResult.mjs";

import type { MockingInfos } from "../Type/MockingInfos.mjs";

import type { NextLoad } from "../Type/NextLoad.mjs";

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

export { load };
