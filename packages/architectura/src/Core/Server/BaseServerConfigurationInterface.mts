import type { ExecutionContextService } from "../ExecutionContext.mjs";

interface BaseServerConfigurationInterface
{
    port: number;
    contextConstructor?: typeof ExecutionContextService;
}

export type { BaseServerConfigurationInterface };
