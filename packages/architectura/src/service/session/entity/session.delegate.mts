import type { JSONObjectType } from "../../../utility/json/definition/type/json-object.type.mjs";

/**
 * Abstract session delegate
 */
abstract class SessionDelegate
{
	/**
	 * Fetch the session data
	 */
	public abstract fetchData(uuid: string): Promise<JSONObjectType | undefined>;

	/**
	 * Save the session data
	 */
	public abstract saveData(uuid: string, data: JSONObjectType): Promise<void>;

	/**
	 * Remove the session data
	 */
	public abstract removeData(uuid: string): Promise<void>;
}

export { SessionDelegate };
