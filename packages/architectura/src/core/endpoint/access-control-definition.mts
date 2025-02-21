import type { AccessControlDefinitionInstantiationInterface } from "./definition/interface/access-control-definition-instantiation.interface.mjs";

class AccessControlDefinition
{
	/**
	 * Which headers are allowed for this endpoint.
	 *
	 * @remarks
	 * By default, no headers are allowed.
	 * If you want to allow all headers, set this property to "*".
	 * Otherwise, list the headers you want to allow.
	 * This property is used to set the Access-Control-Allow-Headers during automatic preflight.
	 */
	protected readonly allowedHeaders: Array<string> | "*" = [];

	/**
	 * Which origins are allowed for this endpoint.
	 *
	 * @remarks
	 * By default, no origins are allowed.
	 * If you want to allow all origins, set this property to "*".
	 * Otherwise, list the origins you want to allow.
	 * This property is used to set the Access-Control-Allow-Origin during automatic preflight.
	 */
	protected readonly allowedOrigins: Array<string> | "*" = [];

	/**
	 * How long the preflight response can be cached in seconds.
	 * Defaults to 0.
	 *
	 * @remarks
	 * This property is used to set the Access-Control-Max-Age during automatic preflight.
	 * If you want to disable caching, set this property to 0.
	 * Otherwise, set it to the number of seconds you want to cache the preflight response.
	 *
	 * Important: If you do not set this property, or set it to 0, the preflight response will not be cached.
	 * This can lead to a performance penalty, as the preflight request will be sent for every request.
	 */
	protected readonly maxAge: number = 0;

	private readonly mark: symbol = Symbol("AccessControlDefinition");

	public constructor(parameters: AccessControlDefinitionInstantiationInterface)
	{
		this.allowedHeaders = parameters.allowedHeaders;
		this.allowedOrigins = parameters.allowedOrigins;
		this.maxAge = parameters.maxAge;
	}

	/**
	 * Get the allowed headers.
	 *
	 * @sealed
	 */
	public getAllowedHeaders(): Array<string> | "*"
	{
		return this.allowedHeaders;
	}

	/**
	 * Get the allowed origins.
	 *
	 * @sealed
	 */
	public getAllowedOrigins(): Array<string> | "*"
	{
		return this.allowedOrigins;
	}

	/**
	 * Get the max age.
	 *
	 * @sealed
	 */
	public getMaxAge(): number
	{
		return this.maxAge;
	}

	/**
	 * Get the mark.
	 *
	 * @sealed
	 */
	public getMark(): symbol
	{
		return this.mark;
	}

	/**
	 * Generate the preflight headers
	 *
	 * @sealed
	 * @returns The preflight headers.
	 */
	public generatePreflightHeaders(): Headers
	{
		const headers: Headers = new Headers();

		headers.set("Access-Control-Allow-Headers", this.allowedHeaders === "*" ? "*" : this.allowedHeaders.join(", "));
		headers.set("Access-Control-Allow-Origin", this.allowedOrigins === "*" ? "*" : this.allowedOrigins.join(", "));
		headers.set("Access-Control-Max-Age", this.maxAge.toString());
		headers.set("Content-Length", "0");

		return headers;
	}
}

export { AccessControlDefinition };
