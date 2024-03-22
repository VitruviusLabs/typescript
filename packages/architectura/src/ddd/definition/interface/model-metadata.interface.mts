interface ModelMetadataInterface
{
	id: bigint | number | string;
	uuid: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | undefined;
}

export type { ModelMetadataInterface };
