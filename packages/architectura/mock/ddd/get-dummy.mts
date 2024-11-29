import type { MockDummyType } from "./definition/type/mock-dummy-type.mjs";
import { DummyModel } from "./dummy.model.mjs";
import { getDefaultDummyProperties } from "./get-default-dummy-properties.mjs";

function getDummy(parameters?: Partial<MockDummyType>): DummyModel
{
	const properties: Required<MockDummyType> = {
		...getDefaultDummyProperties(parameters?.repositoryStatus),
		...parameters,
	};

	const instance: DummyModel = new DummyModel({
		uuid: properties.uuid,
		value: properties.value,
	});

	// @ts-expect-error: Simulating instance processed in repository
	instance.repositoryStatus = properties.repositoryStatus;
	// @ts-expect-error: Simulating instance processed in repository
	instance.id = properties.id ?? undefined;
	// @ts-expect-error: Simulating instance processed in repository
	instance.createdAt = properties.createdAt ?? undefined;
	// @ts-expect-error: Simulating instance processed in repository
	instance.updatedAt = properties.updatedAt ?? undefined;
	// @ts-expect-error: Simulating instance processed in repository
	instance.deletedAt = properties.deletedAt ?? undefined;

	return instance;
}

export { getDummy };
