import type { ExecutionContextService } from "../execution-context.service.mjs";

interface BaseServerConfigurationInterface
{
    port: number;
    contextConstructor?: typeof ExecutionContextService;
}

export type { BaseServerConfigurationInterface };
