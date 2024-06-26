/**
 * Helper for endpoint routes.
 *
 * @internal
 * @sealed
 */
class RouteUtility
{
	/**
	 * Normalize an endpoint route
	 *
	 * @internal
	 */
	public static NormalizeRoute(route: RegExp | string): RegExp
	{
		const FLAGS: string = "u";

		if (route instanceof RegExp)
		{
			return new RegExp(RouteUtility.MakeRouteWhole(route.source), FLAGS);
		}

		return new RegExp(RouteUtility.MakeRouteWhole(route), FLAGS);
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
