import type { ResolveContext } from "./ResolveContext.mjs";

import type { ResolveResult } from "./ResolveResult.mjs";

type NextResolve = (module_identifier: string, context: ResolveContext) => ResolveResult;

export type { NextResolve };
