import type { UnsafeServerInstantiationInterface } from "../interface/unsafe-server-instantiation.interface.mjs";
import type { SecureServerInstantiationInterface } from "../interface/secure-server-instantiation.interface.mjs";

/** @internal */
type ServerInstantiationType = (
	| SecureServerInstantiationInterface
	| UnsafeServerInstantiationInterface
);

export type { ServerInstantiationType };
