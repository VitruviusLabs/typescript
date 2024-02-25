function resolveModuleIdentifier(specifier: string, meta_url: string): string
{
	return (new URL(specifier, meta_url)).href;
}

export { resolveModuleIdentifier };
