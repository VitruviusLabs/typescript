import type { LoadContext } from "./LoadContext.js";

import type { LoadResult } from "./LoadResult.js";

type NextLoad = (module_identifier: string, context: LoadContext) => Promise<LoadResult>;

export type { NextLoad };
