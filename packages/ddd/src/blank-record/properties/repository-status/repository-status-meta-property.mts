import type { BasePropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/base-property-instantiation.interface.mjs";
import { PredefinedMetaProperty } from "../../../base/auxiliary/meta-property/predefined-meta-property.mjs";
import { RepositoryStatusEnum } from "./definition/enum/repository-status.enum.mjs";
import { RepositoryStatusPropertyDefinition } from "./repository-status-property-definition.mjs";
import { RepositoryStatusProperty } from "./repository-status-property.mjs";

class RepositoryStatusMetaProperty extends PredefinedMetaProperty<RepositoryStatusEnum, RepositoryStatusPropertyDefinition, RepositoryStatusProperty>
{
	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async getPropertyDefinition(): Promise<RepositoryStatusPropertyDefinition>
	{
		return new RepositoryStatusPropertyDefinition();
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: BasePropertyInstantiationInterface<RepositoryStatusEnum, RepositoryStatusPropertyDefinition>): RepositoryStatusProperty
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
