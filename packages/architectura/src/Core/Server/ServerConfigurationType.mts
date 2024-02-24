import type { HTTPSServerConfigurationInterface } from "./HTTPSServerConfigurationInterface.mjs";

import type { HTTPServerConfigurationInterface } from "./http-server-configuration.interface.mjs";

type ServerConfigurationType = (
    | HTTPServerConfigurationInterface
    | HTTPSServerConfigurationInterface
);

export type { ServerConfigurationType };
