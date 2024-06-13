/** @type { import("typescript-eslint").ConfigWithExtends["rules"] } */
const RULES = {
	"@stylistic/generator-star-spacing": "off",
	"@stylistic/brace-style": "off",
	"@stylistic/max-statements-per-line": [
		"error",
		{
			"max": 2
		}
	],
	"@typescript/dot-notation": [
		"error",
		{
			"allowKeywords": true,
			"allowPrivateClassPropertyAccess": true,
			"allowProtectedClassPropertyAccess": true,
			"allowIndexSignaturePropertyAccess": true
		}
	],
	"@typescript/explicit-module-boundary-types": "off",
	"@typescript/no-confusing-void-expression": "off",
	"@typescript/no-empty-function": "off",
	"@typescript/no-extraneous-class": "off",
	"@typescript/no-floating-promises": "off",
	"@typescript/no-magic-numbers": "off",
	"@typescript/no-unsafe-assignment": "off",
	"@typescript/no-unsafe-argument": "off",
	"@typescript/no-unsafe-member-access": "off",
	"@typescript/no-unused-expressions": "off",
	"@typescript/no-unsafe-call": "off",
	"@typescript/only-throw-error": "off",
	"@typescript/prefer-promise-reject-errors": "off",
	"@typescript/unbound-method": "off",
	"consistent-return": "off",
	"func-names": "off",
	"func-style": "off",
	"max-classes-per-file": "off",
	"max-lines": "off",
	"max-lines-per-function": "off",
	"max-statements": "off",
	"no-new": "off",
	"symbol-description": "off",
};

export { RULES as rules };
