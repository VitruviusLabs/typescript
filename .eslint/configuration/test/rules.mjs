const RULES = {
	"@style/generator-star-spacing": "off",
	"@style/brace-style": "off",
	"@style/max-statements-per-line": [
		"error",
		{
			"max": 2
		}
	],
	"@ts/class-methods-use-this": "off",
	"@ts/dot-notation": [
		"error",
		{
			"allowKeywords": true,
			"allowPrivateClassPropertyAccess": true,
			"allowProtectedClassPropertyAccess": true,
			"allowIndexSignaturePropertyAccess": true
		}
	],
	"@ts/explicit-module-boundary-types": "off",
	"@ts/no-confusing-void-expression": "off",
	"@ts/no-empty-function": "off",
	"@ts/no-extraneous-class": "off",
	"@ts/no-floating-promises": "off",
	"@ts/no-magic-numbers": "off",
	"@ts/no-unsafe-assignment": "off",
	"@ts/no-unsafe-argument": "off",
	"@ts/no-unsafe-member-access": "off",
	"@ts/no-unused-expressions": "off",
	"@ts/no-unsafe-call": "off",
	"@ts/only-throw-error": "off",
	"@ts/prefer-promise-reject-errors": "off",
	"@ts/unbound-method": "off",
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
