import type { PropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/property-instantiation.interface.mjs";
import { PredefinedMetaProperty } from "../../../base/auxiliary/meta-property/predefined-meta-property.mjs";
import { RepositoryStatusEnum } from "./definition/enum/repository-status.enum.mjs";
import { RepositoryStatusProperty } from "./repository-status-property.mjs";
import { BlankRecordPropertyEnum } from "../../definition/enum/blank-record-property.enum.mjs";
import { RepositoryStatusTypeDefinition } from "./repository-status-type-definition.mjs";
import { PropertyDefinition } from "../../../base/auxiliary/property-definition/property-definition.mjs";

/* eslint-disable @style/padding-line-between-statements */
type T = RepositoryStatusEnum;
type TD = RepositoryStatusTypeDefinition;
type PD = PropertyDefinition<T, TD>;
type P = RepositoryStatusProperty;
/* eslint-enable @style/padding-line-between-statements */

class RepositoryStatusMetaProperty extends PredefinedMetaProperty<T, TD, PD, P>
{
	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async getTypeDefinition(): Promise<TD>
	{
		return new RepositoryStatusTypeDefinition();
	}

	public async getPropertyDefinition(): Promise<PD>
	{
		return new PropertyDefinition({
			identifier: BlankRecordPropertyEnum.REPOSITORY_STATUS,
			typeDefinition: await this.getTypeDefinition(),
		});
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: PropertyInstantiationInterface<T, TD>): P
	{
		return new RepositoryStatusProperty(parameters);
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	protected async getInitialValue(): Promise<T>
	{
		return RepositoryStatusEnum.NEW;
	}
}

export { RepositoryStatusMetaProperty };
