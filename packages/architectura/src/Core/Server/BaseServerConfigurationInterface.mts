import type { ExecutionContext } from "../ExecutionContext.mjs";

interface BaseServerConfigurationInterface
{
    port: number;
    contextConstructor?: typeof ExecutionContext;
}

export type { BaseServerConfigurationInterface };
