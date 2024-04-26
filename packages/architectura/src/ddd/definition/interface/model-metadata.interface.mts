interface ModelMetadataInterface
{
	id: bigint | number | string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | undefined;
	// UUID is only added to make it mandatory when combined with BaseModelInstantiationInterface
	uuid: string;
}

export type { ModelMetadataInterface };
