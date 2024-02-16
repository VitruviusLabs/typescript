import type { BaseServerConfigurationInterface } from "./BaseServerConfigurationInterface.mjs";

interface HTTPServerConfigurationInterface extends BaseServerConfigurationInterface
{
    https: false;
}

export type { HTTPServerConfigurationInterface };
