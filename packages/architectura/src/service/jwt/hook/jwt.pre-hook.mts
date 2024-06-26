import type { ExecutionContext } from "../../../core/execution-context/execution-context.mjs";
import type { SecretType } from "../definition/type/secret.type.mjs";
import { BasePreHook } from "../../../core/hook/base.pre-hook.mjs";
import { JWTConstantEnum } from "../definition/enum/jwt-constant.enum.mjs";
import { JWTFactory } from "../data-object/jwt.factory.mjs";
import { JWT } from "../data-object/jwt.mjs";

/**
 * JWT pre-hook
 *
 * @sealed
 */
class JWTPreHook extends BasePreHook
{
	private readonly secret: SecretType;

	/**
	 * Create a new JWT pre-hook
	 */
	public constructor(secret: SecretType)
	{
		super();
		this.secret = secret;
	}

	/**
	 * Retrieve JWT from a request
	 *
	 * @remarks
	 * Link it to the execution context
	 *
	 * @throws if the JWT exists but is invalid
	 */
	public override execute(context: ExecutionContext): void
	{
		const JWT_HEADER: string | undefined = context.getRequest().getHeader("Authorization");

		if (JWT_HEADER === undefined || !JWT_HEADER.startsWith(JWTConstantEnum.BEARER_PREFIX))
		{
			return;
		}

		const TOKEN: JWT = JWTFactory.Parse(JWT_HEADER.slice(JWTConstantEnum.BEARER_PREFIX.length), this.secret);

		context.setContextualItem(JWT, TOKEN);
	}
}

export { JWTPreHook };
