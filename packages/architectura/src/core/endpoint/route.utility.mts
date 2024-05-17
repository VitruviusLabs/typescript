class RouteUtility
{
	public static NormalizeRoute(route: RegExp | string): RegExp
	{
		if (route instanceof RegExp)
		{
			return new RegExp(this.MakeRouteWhole(route.source), route.flags);
		}

		return new RegExp(this.MakeRouteWhole(route));
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
