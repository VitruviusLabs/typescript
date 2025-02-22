import type { AccessControlDefinition } from "../../../endpoint/access-control-definition.mjs";

/**
 * Shared properties of server configuration
 */
interface BaseServerConfigurationInterface
{
	port: number;
	defaultAccessControlDefinition?: AccessControlDefinition | undefined;
}

export type { BaseServerConfigurationInterface };
