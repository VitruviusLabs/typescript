interface NormalizedError
{
	message: string;
	causes: Array<NormalizedError>;
}

export type { NormalizedError };
