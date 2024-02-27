const enum ContentTypeEnum
{
	UNKNOWN = "application/octet-stream",
	TEXT = "text/plain",
	// eslint-disable-next-line @typescript-eslint/no-shadow -- Not shadowing anything
	JSON = "application/json",
	FORM_DATA = "multipart/form-data",
}

export { ContentTypeEnum };
