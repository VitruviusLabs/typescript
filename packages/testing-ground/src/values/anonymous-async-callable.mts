function create(): () => Promise<void>
{
	// eslint-disable-next-line @typescript/no-empty-function -- Dummy
	return async (): Promise<void> => {};
}

const VALUE: () => Promise<void> = create();

export { VALUE as anonymousAsyncCallable };
