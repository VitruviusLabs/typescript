/**
 * Standard JWT header
 *
 * @internal
 */
interface JWTHeaderInterface
{
	typ: "JWT";
	alg: string;
}

export type { JWTHeaderInterface };
