interface NormalizedError
{
	causes: Array<NormalizedError>;
	message: string;
}

export type { NormalizedError };
