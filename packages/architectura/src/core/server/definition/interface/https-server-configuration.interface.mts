import type { BaseServerConfigurationInterface } from "./base-server-configuration.interface.mjs";

/**
 * Properties of a secure server configuration
 */
interface HTTPSServerConfigurationInterface extends BaseServerConfigurationInterface
{
	https: true;
	certificate: string;
	key: string;
}

export type { HTTPSServerConfigurationInterface };
