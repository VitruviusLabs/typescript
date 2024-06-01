import type { BaseServerInstantiationInterface } from "./base-server-instantiation.interface.mjs";

/** @internal */
interface SecureServerInstantiationInterface extends BaseServerInstantiationInterface
{
	https: true;
	certificate: Buffer | string;
	key: Buffer | string;
}

export type { SecureServerInstantiationInterface };
