import type { HTTPServerConfigurationInterface } from "../interface/http-server-configuration.interface.mjs";

import type { HTTPSServerConfigurationInterface } from "../interface/https-server-configuration.interface.mjs";

type ServerConfigurationType = (
    | HTTPServerConfigurationInterface
    | HTTPSServerConfigurationInterface
);

export type { ServerConfigurationType };
