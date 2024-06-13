/** @type { import("typescript-eslint").ConfigWithExtends["rules"] } */
const RULES = {
	"@stylistic/js/generator-star-spacing": "off",
	"@stylistic/ts/brace-style": "off",
	"@stylistic/js/max-statements-per-line": [
		"error",
		{
			"max": 2
		}
	],
	"@typescript-eslint/class-methods-use-this": "off",
	"@typescript-eslint/dot-notation": [
		"error",
		{
			"allowKeywords": true,
			"allowPrivateClassPropertyAccess": true,
			"allowProtectedClassPropertyAccess": true,
			"allowIndexSignaturePropertyAccess": true
		}
	],
	"@typescript-eslint/explicit-module-boundary-types": "off",
	"@typescript-eslint/no-confusing-void-expression": "off",
	"@typescript-eslint/no-empty-function": "off",
	"@typescript-eslint/no-extraneous-class": "off",
	"@typescript-eslint/no-floating-promises": "off",
	"@typescript-eslint/no-magic-numbers": "off",
	"@typescript-eslint/no-unsafe-assignment": "off",
	"@typescript-eslint/no-unsafe-argument": "off",
	"@typescript-eslint/no-unsafe-member-access": "off",
	"@typescript-eslint/no-unused-expressions": "off",
	"@typescript-eslint/no-unsafe-call": "off",
	"@typescript-eslint/unbound-method": "off",
	"consistent-return": "off",
	"func-names": "off",
	"func-style": "off",
	"max-classes-per-file": "off",
	"max-lines": "off",
	"max-lines-per-function": "off",
	"max-statements": "off",
	"no-new": "off",
	"symbol-description": "off"
};

export { RULES as rules };
