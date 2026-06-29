import { BlankRecordPropertyEnum } from "../../definition/enum/blank-record-property.enum.mjs";
import { RepositoryDateMetaProperty } from "./repository-date-meta-property.mjs";

class RegistrationDateMetaProperty extends RepositoryDateMetaProperty
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public getIdentifier(): BlankRecordPropertyEnum
	{
		return BlankRecordPropertyEnum.REGISTRATION_DATE;
	}
}

export { RegistrationDateMetaProperty };
