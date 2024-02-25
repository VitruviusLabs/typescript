import { notStrictEqual, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { Base64URL } from "../../../src/service/jwt/base64-url.mjs";

describe(
	"Base64URL",
	(): void =>
	{
		it(
			"should be able to encode and decode a string",
			(): void =>
			{
				const MESSAGE: string = "Hello, World!";
				const ENCODED_MESSAGE: string = Base64URL.Encode(MESSAGE);
				const DECODED_MESSAGE: string = Base64URL.Decode(ENCODED_MESSAGE);

				notStrictEqual(MESSAGE, ENCODED_MESSAGE);
				notStrictEqual(ENCODED_MESSAGE, DECODED_MESSAGE);
				strictEqual(DECODED_MESSAGE, MESSAGE);
			}
		);
	}
);
