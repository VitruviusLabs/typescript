/**
 * NodeJS uses the base Error class to represent errors,
 * but adds a code property to it.
 */
interface ErrorWithCodeInterface extends Error
{
	code: string;
}

export type { ErrorWithCodeInterface };
