import type { BaseServerConfigurationInterface } from "./BaseServerConfigurationInterface.mjs";

interface HTTPSServerConfigurationInterface extends BaseServerConfigurationInterface {
    https: true;
    certificate: string;
    key: string;
}

export type { HTTPSServerConfigurationInterface };
