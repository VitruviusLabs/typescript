import type { UnsafeServerConfigurationInterface } from "../interface/unsafe-server-configuration.interface.mjs";
import type { SecureServerConfigurationInterface } from "../interface/secure-server-configuration.interface.mjs";

/**
 * Union of secure and unsecure server configurations
 */
type ServerConfigurationType = (
	| SecureServerConfigurationInterface
	| UnsafeServerConfigurationInterface
);

export type { ServerConfigurationType };
