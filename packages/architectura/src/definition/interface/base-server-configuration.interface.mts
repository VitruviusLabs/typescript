import type { ExecutionContextService } from "../../service/execution-context/execution-context.service.mjs";

interface BaseServerConfigurationInterface
{
    port: number;
    contextConstructor?: typeof ExecutionContextService;
}

export type { BaseServerConfigurationInterface };
