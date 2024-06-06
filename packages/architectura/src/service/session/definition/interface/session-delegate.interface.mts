import type { JSONObjectType } from "@vitruvius-labs/toolbox";

/**
 * Interface for a session delegate
 */
interface SessionDelegateInterface
{
	fetchData: (uuid: string) => Promise<JSONObjectType | undefined>;
	saveData: (uuid: string, data: JSONObjectType) => Promise<void>;
	removeData: (uuid: string) => Promise<void>;
}

export type { SessionDelegateInterface };
