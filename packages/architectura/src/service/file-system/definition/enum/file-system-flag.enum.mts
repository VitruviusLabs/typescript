const enum FileSystemFlagEnum
{
	READ = "r",
	READ_WRITE = "r+",
	READ_SYNCHRONOUS = "rs",
	READ_WRITE_SYNCHRONOUS = "rs+",
	WRITE = "w",
	WRITE_CREATE = "w+",
	WRITE_FAIL = "wx",
	WRITE_CREATE_FAIL = "wx+",
	APPEND = "a",
	APPEND_FAIL = "ax",
	APPEND_CREATE = "a+",
	APPEND_CREATE_FAIL = "ax+",
}

export { FileSystemFlagEnum };
