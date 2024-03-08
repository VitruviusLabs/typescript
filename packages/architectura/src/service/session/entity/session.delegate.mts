import type { JSONObjectType } from "../../../definition/type/json-object.type.mjs";

abstract class SessionDelegate
{
	public abstract fetchData(uuid: string): Promise<JSONObjectType | undefined>;
	public abstract saveData(uuid: string, data: JSONObjectType): Promise<void>;
	public abstract removeData(uuid: string): Promise<void>;
}

export { SessionDelegate };
