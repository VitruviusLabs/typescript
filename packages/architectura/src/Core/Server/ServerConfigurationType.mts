import type { HTTPServerConfigurationInterface } from "../../definition/interface/http-server-configuration.interface.mjs";

import type { HTTPSServerConfigurationInterface } from "../../definition/interface/https-server-configuration.interface.mjs";


type ServerConfigurationType = (
    | HTTPServerConfigurationInterface
    | HTTPSServerConfigurationInterface
);

export type { ServerConfigurationType };
