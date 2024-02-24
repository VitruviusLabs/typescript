import type { BaseServerConfigurationInterface } from "../../definition/interface/base-server-configuration.interface.mjs";

interface HTTPServerConfigurationInterface extends BaseServerConfigurationInterface
{
    https: false;
}

export type { HTTPServerConfigurationInterface };
