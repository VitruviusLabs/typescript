import type { HTTPServerConfigurationInterface } from "../interface/http-server-configuration.interface.mjs";
import type { HTTPSServerConfigurationInterface } from "../interface/https-server-configuration.interface.mjs";

/**
 * Union of secure and unsecure server configurations
 */
type ServerConfigurationType = (
	| HTTPServerConfigurationInterface
	| HTTPSServerConfigurationInterface
);

export type { ServerConfigurationType };
