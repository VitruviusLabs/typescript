/** @type { import("typescript-eslint").ConfigWithExtends["rules"] } */
const RULES = {
	"@stylistic/js/array-bracket-newline": [
		"error",
		"consistent"
		// unsupported combination
		/*
		{
			"consistent": true,
			"multiline": true,
			"minItems": null
		}
		*/
	],
	"@stylistic/js/array-bracket-spacing": [
		"error",
		"never",
		{
			"singleValue": false,
			"objectsInArrays": false,
			"arraysInArrays": false
		}
	],
	"@stylistic/js/array-element-newline": [
		"error",
		"consistent"
		// unsupported combination
		/*
		{
			"consistent": true,
			"multiline": true,
			"minItems": null
		},
		*/
	],
	"@stylistic/js/arrow-parens": [
		"error",
		"always"
	],
	"@stylistic/js/arrow-spacing": [
		"error",
		{
			"before": true,
			"after": true
		}
	],
	"@stylistic/js/comma-style": [
		"error",
		"last"
	],
	"@stylistic/js/computed-property-spacing": [
		"error",
		"never"
	],
	"@stylistic/js/dot-location": [
		"error",
		"property"
	],
	"@stylistic/js/eol-last": [
		"error",
		"always"
	],
	"@stylistic/js/function-call-argument-newline": [
		"error",
		"consistent"
	],
	"@stylistic/js/function-paren-newline": [
		"error",
		"multiline-arguments"
	],
	"@stylistic/js/generator-star-spacing": [
		"error",
		{
			"named": {
				"before": false,
				"after": true
			},
			"anonymous": {
				"before": false,
				"after": false
			},
			"method": {
				"before": true,
				"after": true
			}
		}
	],
	"@stylistic/js/indent": [
		"error",
		"tab",
		{
			"SwitchCase": 1
		}
	],
	"@stylistic/js/jsx-quotes": [
		"error",
		"prefer-double"
	],
	"@stylistic/js/linebreak-style": [
		"error",
		"unix"
	],
	"@stylistic/js/max-len": [
		"error",
		{
			"code": 200,
			"tabWidth": 4,
			"comments": 300,
			/*"ignorePattern": undefined*/
			"ignoreComments": false,
			"ignoreTrailingComments": false,
			"ignoreUrls": false,
			"ignoreStrings": true,
			"ignoreRegExpLiterals": true,
			"ignoreTemplateLiterals": true
		}
	],
	"@stylistic/js/max-statements-per-line": [
		"error",
		{
			"max": 1
		}
	],
	"@stylistic/js/multiline-ternary": [
		"error",
		"always-multiline"
	],
	"@stylistic/js/new-parens": [
		"error",
		"always"
	],
	"@stylistic/js/newline-per-chained-call": [
		"error",
		{
			/*"consistent": true,*/
			"ignoreChainWithDepth": 3
		}
	],
	"@stylistic/js/no-floating-decimal": "error",
	"@stylistic/js/no-mixed-spaces-and-tabs": [
		"error",
		"smart-tabs"
	],
	"@stylistic/js/no-multi-spaces": [
		"error",
		{
			"includeTabs": false,
			"ignoreEOLComments": false,
			"exceptions": {
				"Property": false,
				"VariableDeclarator": false,
				"ImportDeclaration": false
			}
		}
	],
	"@stylistic/js/no-multiple-empty-lines": [
		"error",
		{
			"max": 1,
			"maxBOF": 0,
			"maxEOF": 1
		}
	],
	"@stylistic/js/no-tabs": [
		"error",
		{
			"allowIndentationTabs": true
		}
	],
	"@stylistic/js/no-trailing-spaces": [
		"error",
		{
			"skipBlankLines": false,
			"ignoreComments": false
		}
	],
	"@stylistic/js/no-whitespace-before-property": "error",
	"@stylistic/js/object-curly-newline": [
		"error",
		{
			"ObjectExpression": {
				"consistent": true,
				"multiline": true
			},
			"ObjectPattern": {
				"consistent": true,
				"multiline": true
			},
			"ImportDeclaration": {
				"consistent": true,
				"multiline": true
			},
			"ExportDeclaration": {
				"consistent": true,
				"multiline": true
			}
		}
	],
	"@stylistic/js/object-property-newline": [
		"error",
		{
			"allowAllPropertiesOnSameLine": true
		}
	],
	"@stylistic/js/operator-linebreak": [
		"error",
		"before"
	],
	"@stylistic/js/padded-blocks": [
		"error",
		"never"
	],
	"@stylistic/js/rest-spread-spacing": [
		"error",
		"never"
	],
	"@stylistic/js/semi-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@stylistic/js/semi-style": [
		"error",
		"last"
	],
	"@stylistic/js/space-in-parens": [
		"error",
		"never"
	],
	"@stylistic/js/space-unary-ops": [
		"error",
		{
			"words": true,
			"nonwords": false
		}
	],
	"@stylistic/js/spaced-comment": [
		"error",
		"always",
		{
			"line": {
				"markers": [
					"/"
				],
				"exceptions": [
					"-",
					"=",
					"*"
				]
			},
			"block": {
				"markers": [
					"*"
				],
				"exceptions": [
					"*"
				],
				"balanced": true
			}
		}
	],
	"@stylistic/js/switch-colon-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@stylistic/js/template-curly-spacing": [
		"error",
		"never"
	],
	"@stylistic/js/template-tag-spacing": [
		"error",
		"never"
	],
	"@stylistic/js/wrap-iife": [
		"error",
		"inside",
		{
			"functionPrototypeMethods": true
		}
	],
	"@stylistic/js/yield-star-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@stylistic/ts/block-spacing": [
		// Possibly unnecessary
		"error",
		"always"
	],
	"@stylistic/ts/brace-style": [
		"error",
		"allman",
		{
			"allowSingleLine": true
		}
	],
	"@stylistic/ts/comma-dangle": [
		"error",
		{
			"arrays": "always-multiline",
			"objects": "always-multiline",
			"imports": "always-multiline",
			"exports": "always-multiline",
			"functions": "never",
			"enums": "always-multiline",
			"generics": "never",
			"tuples": "always-multiline"
		}
	],
	"@stylistic/ts/comma-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@stylistic/ts/function-call-spacing": [
		"error",
		"never"
	],
	"@stylistic/ts/indent": "off", // Bugged
	"@stylistic/ts/key-spacing": [
		"error",
		{
			"beforeColon": false,
			"afterColon": true,
			"mode": "strict"
		}
	],
	"@stylistic/ts/keyword-spacing": [
		"error",
		{
			"before": true,
			"after": true
			/*
			"before": false,
			"after": true,
			"overrides": {
				"as": {
					"before": true,
					"after": true
				},
				"in": {
					"before": true,
					"after": true
				},
				"of": {
					"before": true,
					"after": true
				}
			}
			*/
		}
	],
	"@stylistic/ts/lines-between-class-members": [
		"error",
		"always",
		{
			"exceptAfterOverload": true,
			"exceptAfterSingleLine": true
		}
	],
	"@stylistic/ts/member-delimiter-style": [
		"error",
		{
			"multilineDetection": "brackets",
			"multiline": {
				"delimiter": "semi",
				"requireLast": true
			},
			"singleline": {
				"delimiter": "semi",
				"requireLast": false
			}
		}
	],
	"@stylistic/ts/no-extra-parens": [
		"error",
		"all",
		{
			"conditionalAssign": true,
			"returnAssign": true,
			"nestedBinaryExpressions": false,
			"ternaryOperandBinaryExpressions": false,
			"enforceForArrowConditionals": false,
			"enforceForNewInMemberExpressions": false,
			"enforceForFunctionPrototypeMethods": false,
			/*"allowParensAfterCommentPattern": undefined,*/
			"ignoreJSX": "multi-line"
		}
	],
	"@stylistic/ts/no-extra-semi": "error",
	"@stylistic/ts/object-curly-spacing": [
		"error",
		"always",
		{
			"arraysInObjects": true,
			"objectsInObjects": true
		}
	],
	"@stylistic/ts/padding-line-between-statements": [
		"error",
		{
			"blankLine": "always",
			"prev": [
				"const",
				"let"
			],
			"next": "*"
		},
		{
			"blankLine": "any",
			"prev": [
				"const",
				"let"
			],
			"next": [
				"const",
				"let"
			]
		},
		{
			"blankLine": "always",
			"prev": "*",
			"next": [
				"type",
				"interface",
				"class",
				"function",
				"continue",
				"return",
				"throw",
				"try",
				"switch",
				"case",
				"default",
				"if",
				"do",
				"while",
				"export",
				"multiline-expression",
				"block",
				"block-like",
				"multiline-block-like"
			]
		},
		{
			"blankLine": "always",
			"prev": [
				"type",
				"interface",
				"class",
				"function",
				"switch",
				"require",
				"import",
				"multiline-expression",
				"block",
				"block-like",
				"multiline-block-like"
			],
			"next": "*"
		},
		{
			"blankLine": "any",
			"prev": [
				"case"
			],
			"next": [
				"case"
			]
		},
		{
			"blankLine": "any",
			"prev": [
				"import"
			],
			"next": [
				"import"
			]
		},
		{
			"blankLine": "any",
			"prev": [
				"export"
			],
			"next": [
				"export"
			]
		}
	],
	"@stylistic/ts/quote-props": [
		"error",
		"consistent-as-needed"
	],
	"@stylistic/ts/quotes": [
		"error",
		"double",
		{
			"avoidEscape": true,
			"allowTemplateLiterals": false
		}
	],
	"@stylistic/ts/semi": [
		"error",
		"always",
		{
			"omitLastInOneLineBlock": false,
			"omitLastInOneLineClassBody": false
		}
	],
	"@stylistic/ts/space-before-blocks": [
		// Possibly unnecessary
		"error",
		"always"
	],
	"@stylistic/ts/space-before-function-paren": [
		"error",
		{
			"anonymous": "never",
			"named": "never",
			"asyncArrow": "always"
		}
	],
	"@stylistic/ts/space-infix-ops": [
		"error",
		{
			"int32Hint": false
		}
	],
	"@stylistic/ts/type-annotation-spacing": [
		"error",
		{
			"before": false,
			"after": true,
			"overrides": {
				"arrow": {
					"before": true,
					"after": true
				}
			}
		}
	],
	"@typescript-eslint/adjacent-overload-signatures": "error",
	"@typescript-eslint/class-literal-property-style": [
		"error",
		"fields"
	],
	"@typescript-eslint/consistent-indexed-object-style": [
		"error",
		"record"
	],
	"@typescript-eslint/consistent-type-definitions": [
		"error",
		"interface"
	],
	"@typescript-eslint/dot-notation": [
		"error",
		{
			"allowKeywords": true,
			/*"allowPattern": undefined,*/
			"allowPrivateClassPropertyAccess": false,
			"allowProtectedClassPropertyAccess": false,
			"allowIndexSignaturePropertyAccess": true
		}
	],
	"@typescript-eslint/member-ordering": [
		"error",
		{
			"default": {
				"order": "as-written",
				"memberTypes": [
					// Signatures
					"readonly-signature",
					"signature",
					"call-signature",
					// Static fields
					"public-static-readonly-field",
					"public-static-field",
					"protected-static-readonly-field",
					"protected-static-field",
					"private-static-readonly-field",
					"private-static-field",
					"#private-static-readonly-field",
					"#private-static-field",
					// Abstract fields
					"public-abstract-readonly-field",
					"public-abstract-field",
					"protected-abstract-readonly-field",
					"protected-abstract-field",
					// Instance fields
					"public-instance-readonly-field",
					"public-instance-field",
					"protected-instance-readonly-field",
					"protected-instance-field",
					"private-instance-readonly-field",
					"private-instance-field",
					// Decorated fields
					"public-decorated-readonly-field",
					"public-decorated-field",
					"protected-decorated-readonly-field",
					"protected-decorated-field",
					"private-decorated-readonly-field",
					"private-decorated-field",
					// Default fields
					"readonly-field",
					"field",
					// Static initialization
					"static-initialization",
					// Constructors
					"public-constructor",
					"protected-constructor",
					"private-constructor",
					"constructor",
					// Static methods
					"public-static-method",
					"protected-static-method",
					"private-static-method",
					"#private-static-method",
					// Abstract methods
					"public-abstract-method",
					"protected-abstract-method",
					// Instance methods
					"public-instance-method",
					"protected-instance-method",
					"private-instance-method",
					// Decorated methods
					"public-decorated-method",
					"protected-decorated-method",
					"private-decorated-method",
					// Default methods
					"method",
					// Static getters and setters
					[
						"public-static-get",
						"public-static-set"
					],
					[
						"protected-static-get",
						"protected-static-set"
					],
					[
						"private-static-get",
						"private-static-set"
					],
					// Abstract getters and setters
					[
						"public-abstract-get",
						"public-abstract-set"
					],
					[
						"protected-abstract-get",
						"protected-abstract-set"
					],
					// Instance getters and setters
					[
						"public-instance-get",
						"public-instance-set"
					],
					[
						"private-instance-get",
						"private-instance-set"
					],
					[
						"protected-instance-get",
						"protected-instance-set"
					],
					// Decorated getters and setters
					[
						"public-decorated-get",
						"public-decorated-set"
					],
					[
						"protected-decorated-get",
						"protected-decorated-set"
					],
					[
						"private-decorated-get",
						"private-decorated-set"
					],
					// Default getters and setters
					[
						"get",
						"set"
					]
				]
			}
		}
	],
	"@typescript-eslint/method-signature-style": [
		"error",
		"property"
	],
	"@typescript-eslint/prefer-for-of": "error",
	"@typescript-eslint/prefer-function-type": "error",
	"@typescript-eslint/sort-type-constituents": [
		"error",
		{
			"checkIntersections": true,
			"checkUnions": true,
			"groupOrder": [
				"named",
				"keyword",
				"operator",
				"literal",
				"function",
				"import",
				"conditional",
				"object",
				"tuple",
				"intersection",
				"union",
				"nullish"
			]
		}
	],
	"arrow-body-style": [
		"error",
		"always"
	],
	"curly": [
		"error",
		"all"
	],
	"func-names": [
		"error",
		"never",
		{
			"generators": "never"
		}
	],
	"grouped-accessor-pairs": [
		"error",
		"getBeforeSet"
	],
	"id-denylist": [
		"error", // enable rule
		"cb",
		"e",
		"err",
		"el",
		"ev",
		"ex",
		"f",
		"fn",
		"fun",
		"func",
		"idx",
		"k",
		"o",
		"obj",
		"v",
		"val"
	],
	"id-length": [
		"error",
		{
			"min": 3,
			"max": 100,
			"properties": "always",
			"exceptions": [
				"a",
				"b",
				"i",
				"j",
				"x",
				"y",
				"z",
				"id",
				"to",
				"up",
				"pH"
			]
		}
	],
	"line-comment-position": [
		"error",
		{
			"position": "above"
		}
	],
	"logical-assignment-operators": [
		"error",
		"never"
	],
	"no-regex-spaces": "error",
	"operator-assignment": [
		"error",
		"never"
	],
	"sort-imports": [
		"error",
		{
			"ignoreDeclarationSort": true
		}
	],
	"yoda": [
		"error",
		"never",
		{
			"exceptRange": true,
			"onlyEquality": false
		}
	]
};

export { RULES as rules };
