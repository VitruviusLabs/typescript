import type { PropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/property-instantiation.interface.mjs";
import { PredefinedMetaProperty } from "../../../base/auxiliary/meta-property/predefined-meta-property.mjs";
import { RepositoryStatusEnum } from "./definition/enum/repository-status.enum.mjs";
import { RepositoryStatusPropertyDefinition } from "./repository-status-property-definition.mjs";
import { RepositoryStatusProperty } from "./repository-status-property.mjs";
import { BlankRecordPropertyEnum } from "../../definition/enum/blank-record-property.enum.mjs";
import { RepositoryStatusTypeDefinition } from "./repository-status-type-definition.mjs";

class RepositoryStatusMetaProperty extends PredefinedMetaProperty<RepositoryStatusEnum, RepositoryStatusPropertyDefinition, RepositoryStatusProperty>
{
	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async getPropertyDefinition(): Promise<RepositoryStatusPropertyDefinition>
	{
		return new RepositoryStatusPropertyDefinition({
			identifier: BlankRecordPropertyEnum.REPOSITORY_STATUS,
			typeDefinition: new RepositoryStatusTypeDefinition(),
		});
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: PropertyInstantiationInterface<RepositoryStatusEnum, RepositoryStatusPropertyDefinition>): RepositoryStatusProperty
	{
		return new RepositoryStatusProperty(parameters);
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	protected async getInitialValue(): Promise<RepositoryStatusEnum>
	{
		return RepositoryStatusEnum.NEW;
	}
}

export { RepositoryStatusMetaProperty };
