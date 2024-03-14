const enum ContentTypeEnum
{
	UNKNOWN = "application/octet-stream",
	TEXT = "text/plain",
	// eslint-disable-next-line @typescript-eslint/no-shadow -- This rule incorrectly applies to enum keys
	JSON = "application/json",
	FORM_DATA = "multipart/form-data",
}

export { ContentTypeEnum };
