/**
 * Properties needed to instantiate an existing entity
 *
 * @remarks
 * Not all fields are required for every operation, but
 * using the same interface for all operations simplifies the code.
 */
interface ModelMetadataInterface
{
	/* Used when fetching existing entities or registering new entities */
	id: bigint | number | string;
	/* Used when fetching existing entities or registering new entities */
	createdAt: Date;
	/* Used when fetching existing entities or updating entities */
	updatedAt: Date;
	/* Used when fetching existing entities or soft deleting entities */
	deletedAt: Date | null | undefined;
	/* Used when fetching existing entities */
	uuid: string;
}

export type { ModelMetadataInterface };
