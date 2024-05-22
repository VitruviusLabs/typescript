import type { BaseServerConfigurationInterface } from "./base-server-configuration.interface.mjs";

/**
 * Properties of unsecure server configuration
 */
interface HTTPServerConfigurationInterface extends BaseServerConfigurationInterface
{
	https: false;
}

export type { HTTPServerConfigurationInterface };
