import type { ResolveContext } from "./ResolveContext.js";

import type { ResolveResult } from "./ResolveResult.js";

type NextResolve = (module_identifier: string, context: ResolveContext) => ResolveResult;

export type { NextResolve };
