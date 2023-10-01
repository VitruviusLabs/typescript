const enum MillisecondEnum
// Eslint does not understand const enum and interprets it as a variable declaration in constant context.
 
{
	SECOND = 1000,
	MINUTE = 60000,
	HOUR = 3600000,
	DAY = 86400000,
	WEEK = 604800000
}

export { MillisecondEnum };
