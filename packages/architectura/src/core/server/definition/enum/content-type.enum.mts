/**
 * Predefined content types
 */
const enum ContentTypeEnum
{
	BINARY = "application/octet-stream",
	TEXT = "text/plain",
	// eslint-disable-next-line @typescript/no-shadow -- This rule incorrectly applies to enum keys
	JSON = "application/json",
	FORM_DATA = "multipart/form-data",
}

export { ContentTypeEnum };
