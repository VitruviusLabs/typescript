interface ModelMetadataInterface
{
	id: number;
	uuid: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | undefined;
}

export type { ModelMetadataInterface };
