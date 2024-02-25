import type { ResolveContext } from "../interface/resolve-context.mjs";
import type { ResolveResult } from "../interface/resolve-result.mjs";

type NextResolve = (module_identifier: string, context: ResolveContext) => ResolveResult;

export type { NextResolve };
