import type { HTTPSServerConfigurationInterface } from "./HTTPSServerConfigurationInterface.mjs";

import type { HTTPServerConfigurationInterface } from "./HTTPServerConfigurationInterface.mjs";

type ServerConfigurationType = (
    | HTTPServerConfigurationInterface
    | HTTPSServerConfigurationInterface
);

export type { ServerConfigurationType };
