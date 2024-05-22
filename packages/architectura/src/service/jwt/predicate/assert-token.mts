import { JWTConstantEnum } from "../definition/enum/jwt-constant.enum.mjs";
import type { TokenType } from "../definition/type/token.type.mjs";

/**
 * Asserts that the token is valid
 *
 * @throws if the token is invalid
 *
 * @internal
 */
function assertToken(parts: Array<string>): asserts parts is TokenType
{
	if (parts.length !== JWTConstantEnum.TOKEN_PARTS)
	{
		throw new Error("There is an error with the validating RegExp.");
	}
}

export { assertToken };
