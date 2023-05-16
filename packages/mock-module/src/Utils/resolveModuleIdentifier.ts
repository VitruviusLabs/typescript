function resolveModuleIdentifier(specifier: string, meta_url: string): string
{
	return (new URL(specifier, meta_url)).href;
	// return import.meta.resolve(specifier, meta_url);
}

export { resolveModuleIdentifier };
