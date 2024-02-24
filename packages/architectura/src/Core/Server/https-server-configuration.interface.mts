import type { BaseServerConfigurationInterface } from "../../definition/interface/base-server-configuration.interface.mjs";

interface HTTPSServerConfigurationInterface extends BaseServerConfigurationInterface
{
    https: true;
    certificate: string;
    key: string;
}

export type { HTTPSServerConfigurationInterface };
