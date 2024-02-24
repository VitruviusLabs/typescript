import type { ExecutionContext } from "../../../execution-context/execution-context.mjs";

interface BaseServerConfigurationInterface
{
    port: number;
    contextConstructor?: typeof ExecutionContext;
}

export type { BaseServerConfigurationInterface };
