import type { DummyInstantiationInterface } from "./definition/_index.mjs";
import { BaseModel } from "../../src/_index.mjs";

class DummyModel extends BaseModel
{
	private value: number;

	public constructor(parameters: DummyInstantiationInterface)
	{
		super(parameters);

		this.value = parameters.value;
	}

	public setValue(value: number): void
	{
		this.value = value;
	}

	public getValue(): number
	{
		return this.value;
	}

	public async save(): Promise<void>
	{
		await Promise.resolve();
	}

	public async delete(): Promise<void>
	{
		await Promise.resolve();
	}
}

export { DummyModel };
