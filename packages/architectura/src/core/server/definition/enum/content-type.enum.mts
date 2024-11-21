/**
 * Predefined content types
 */
const enum ContentTypeEnum
{
	BINARY = "application/octet-stream",
	TEXT = "text/plain",
	HTML = "text/html",
	// eslint-disable-next-line @ts/no-shadow -- This rule incorrectly applies to enum keys
	JSON = "application/json",
	FORM_DATA = "multipart/form-data",
}

export { ContentTypeEnum };
