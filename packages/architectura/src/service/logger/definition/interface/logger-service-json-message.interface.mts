interface LoggerServiceJSONMessageInterface
{
	level: string;
	timestamp: number;
	isoDate: string;
	message: string;
	requestUUID: string | null;
	contextTag: string | null;
}

export type { LoggerServiceJSONMessageInterface };
