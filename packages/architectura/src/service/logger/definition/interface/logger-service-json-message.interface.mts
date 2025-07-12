interface LoggerServiceJSONMessageInterface
{
	level: string;
	timestamp: number;
	logDate: string;
	message: string;
	requestUUID: string | null;
	contextTag: string | null;
}

export type { LoggerServiceJSONMessageInterface };
