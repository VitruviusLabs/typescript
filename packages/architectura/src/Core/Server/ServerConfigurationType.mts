import type { HTTPSServerConfigurationInterface } from "./https-server-configuration.interface.mjs";

import type { HTTPServerConfigurationInterface } from "../../definition/interface/http-server-configuration.interface.mjs";

type ServerConfigurationType = (
    | HTTPServerConfigurationInterface
    | HTTPSServerConfigurationInterface
);

export type { ServerConfigurationType };
