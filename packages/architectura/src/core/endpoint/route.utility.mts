class RouteUtility
{
	public static NormalizeRoute(route: RegExp | string): RegExp
	{
		const FLAGS: string = "u";

		if (route instanceof RegExp)
		{
			return new RegExp(this.MakeRouteWhole(route.source), FLAGS);
		}

		return new RegExp(this.MakeRouteWhole(route), FLAGS);
	}

	private static MakeRouteWhole(route: string): string
	{
		let pattern: string = route;

		if (!route.startsWith("^"))
		{
			pattern = `^${pattern}`;
		}

		if (!route.endsWith("$"))
		{
			pattern = `${pattern}$`;
		}

		return pattern;
	}
}

export { RouteUtility };
