import { DummyModel } from "./dummy.model.mjs";

function getDummy(creation_date?: Date, deletion_date?: Date): DummyModel
{
	const instance: DummyModel = new DummyModel({
		uuid: "00000000-0000-0000-0000-000000000000",
		value: 0,
	});

	if (creation_date !== undefined)
	{
		// @ts-expect-error: Simulating saved instance
		instance.id = 0n;
		// @ts-expect-error: Simulating saved instance
		instance.createdAt = creation_date;
		// @ts-expect-error: Simulating saved instance
		instance.updatedAt = creation_date;
	}

	if (deletion_date !== undefined)
	{
		// @ts-expect-error: Simulating saved instance
		instance.deletedAt = deletion_date;
	}

	return instance;
}

export { getDummy };
