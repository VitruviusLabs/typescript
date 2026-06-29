const enum RepositoryActionEnum
{
	REGISTER = "register",
	UPDATE = "update",
	ARCHIVE = "archive",
	RESTORE = "restore",
	DESTROY = "destroy",
	ERROR_ARCHIVED = "error-restored",
	ERROR_DESTROYED = "error-destroyed",
}

export { RepositoryActionEnum };
