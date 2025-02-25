import type { AccessControlDefinition } from "../../../endpoint/access-control-definition.mjs";

/** @internal */
interface BaseServerInstantiationInterface
{
	port: number;
	defaultAccessControlDefinition?: AccessControlDefinition | undefined;
}

export type { BaseServerInstantiationInterface };
