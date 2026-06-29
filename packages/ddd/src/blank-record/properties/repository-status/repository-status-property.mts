import type { RepositoryStatusPropertyDefinition } from "./repository-status-property-definition.mjs";
import type { BasePropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/base-property-instantiation.interface.mjs";
import { BaseProperty } from "../../../base/auxiliary/property/base-property.mjs";
import { RepositoryStatusEnum } from "./definition/enum/repository-status.enum.mjs";
import { RepositoryActionEnum } from "./definition/enum/repository-action.enum.mjs";
import { NoValue } from "@vitruvius-labs/ts-predicate";

class RepositoryStatusProperty extends BaseProperty<RepositoryStatusEnum, RepositoryStatusPropertyDefinition>
{
	protected action: RepositoryActionEnum;

	public constructor(parameters: BasePropertyInstantiationInterface<RepositoryStatusEnum, RepositoryStatusPropertyDefinition>)
	{
		super(parameters);

		this.action = this.getDefaultAction(parameters.value);
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public override isMutable(): false
	{
		return false;
	}

	public override setValue(): never
	{
		throw new Error(`Property "${this.getDefinition().getIdentifier()}" cannot be mutated directly.`);
	}

	public async repositoryConfirmation(): Promise<void>
	{
		const status: RepositoryStatusEnum | typeof NoValue = this.getNextStatus(this.action);

		if (status === NoValue)
		{
			return;
		}

		await super.setValue(status);

		this.overwritePreviousValue();

		this.action = this.getDefaultAction(status);
	}

	public async setAction(action: RepositoryActionEnum): Promise<void>
	{
		const status: RepositoryStatusEnum = await this.getValue();

		const expected_status: RepositoryStatusEnum = this.getExpectedStatus(action);

		if (status !== expected_status)
		{
			throw new Error(`Cannot ${action} a record that is not ${expected_status}, record is ${status}.`);
		}

		this.action = action;
	}

	public async resetAction(): Promise<void>
	{
		const status: RepositoryStatusEnum = await this.getValue();

		this.action = this.getDefaultAction(status);
	}

	public getAction(): RepositoryActionEnum
	{
		return this.action;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	private getDefaultAction(status: RepositoryStatusEnum): RepositoryActionEnum
	{
		switch (status)
		{
			case RepositoryStatusEnum.NEW:
				return RepositoryActionEnum.REGISTER;

			case RepositoryStatusEnum.SAVED:
				return RepositoryActionEnum.UPDATE;

			case RepositoryStatusEnum.ARCHIVED:
				return RepositoryActionEnum.ERROR_ARCHIVED;

			case RepositoryStatusEnum.DESTROYED:
				return RepositoryActionEnum.ERROR_DESTROYED;
		}
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	private getNextStatus(action: RepositoryActionEnum): RepositoryStatusEnum | typeof NoValue
	{
		switch (action)
		{
			case RepositoryActionEnum.REGISTER:
				return RepositoryStatusEnum.SAVED;

			case RepositoryActionEnum.UPDATE:
				return NoValue;

			case RepositoryActionEnum.ARCHIVE:
				return RepositoryStatusEnum.ARCHIVED;

			case RepositoryActionEnum.RESTORE:
				return RepositoryStatusEnum.SAVED;

			case RepositoryActionEnum.DESTROY:
				return RepositoryStatusEnum.DESTROYED;

			case RepositoryActionEnum.ERROR_ARCHIVED:
			case RepositoryActionEnum.ERROR_DESTROYED:
				throw new Error("Impossible");
		}
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	private getExpectedStatus(action: RepositoryActionEnum): RepositoryStatusEnum
	{
		switch (action)
		{
			case RepositoryActionEnum.REGISTER:
				return RepositoryStatusEnum.NEW;

			case RepositoryActionEnum.UPDATE:
				return RepositoryStatusEnum.SAVED;

			case RepositoryActionEnum.ARCHIVE:
				return RepositoryStatusEnum.SAVED;

			case RepositoryActionEnum.RESTORE:
				return RepositoryStatusEnum.ARCHIVED;

			case RepositoryActionEnum.DESTROY:
				return RepositoryStatusEnum.SAVED;

			case RepositoryActionEnum.ERROR_ARCHIVED:
			case RepositoryActionEnum.ERROR_DESTROYED:
				throw new Error("Impossible");
		}
	}
}

export { RepositoryStatusProperty };
