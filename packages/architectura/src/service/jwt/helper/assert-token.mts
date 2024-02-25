import { JWTConstantEnum } from "../definition/enum/jwt-constant.enum.mjs";
import type { TokenType } from "../definition/type/token.type.mjs";

function assertToken(parts: Array<string>): asserts parts is TokenType
{
	// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
	if (parts.length !== JWTConstantEnum.TokenParts)
	{
		throw new Error("There is an error with the validating RegExp.");
	}
}

export { assertToken };
