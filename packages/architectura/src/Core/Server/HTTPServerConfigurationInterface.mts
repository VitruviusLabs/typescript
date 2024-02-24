import type { BaseServerConfigurationInterface } from "./base-server-configuration.interface.mjs";

interface HTTPServerConfigurationInterface extends BaseServerConfigurationInterface
{
    https: false;
}

export type { HTTPServerConfigurationInterface };
