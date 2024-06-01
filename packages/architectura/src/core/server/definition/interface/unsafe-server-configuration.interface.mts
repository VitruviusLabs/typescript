import type { BaseServerConfigurationInterface } from "./base-server-configuration.interface.mjs";

/**
 * Properties of unsecure server configuration
 */
interface UnsafeServerConfigurationInterface extends BaseServerConfigurationInterface
{
	https: false;
}

export type { UnsafeServerConfigurationInterface };
