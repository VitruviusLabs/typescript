import type { EnvironmentItemDescriptorInterface } from "./EnvironmentItemDescriptorInterface.mjs";

import type { EnvironmentPropertyInterface } from "./EnvironmentPropertyInterface.mjs";

interface EnvironmentDescriptorInterface
{
	SERVER_PORT: EnvironmentItemDescriptorInterface<EnvironmentPropertyInterface<"ServerPort">>;

	USER_SESSION_DURATION: EnvironmentItemDescriptorInterface<EnvironmentPropertyInterface<"UserSessionDuration">>;

	NODE_ENV: EnvironmentItemDescriptorInterface<EnvironmentPropertyInterface<"NodeEnvironment">>;
}

export type { EnvironmentDescriptorInterface };
