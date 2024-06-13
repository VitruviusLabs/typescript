const RULES = {
	"@stylistic/array-bracket-newline": [
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
	"@stylistic/array-bracket-spacing": [
		"error",
		"never",
		{
			"singleValue": false,
			"objectsInArrays": false,
			"arraysInArrays": false
		}
	],
	"@stylistic/array-element-newline": [
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
	"@stylistic/arrow-parens": [
		"error",
		"always"
	],
	"@stylistic/arrow-spacing": [
		"error",
		{
			"before": true,
			"after": true
		}
	],
	"@stylistic/comma-style": [
		"error",
		"last"
	],
	"@stylistic/computed-property-spacing": [
		"error",
		"never"
	],
	"@stylistic/dot-location": [
		"error",
		"property"
	],
	"@stylistic/eol-last": [
		"error",
		"always"
	],
	"@stylistic/function-call-argument-newline": [
		"error",
		"consistent"
	],
	"@stylistic/function-paren-newline": [
		"error",
		"multiline-arguments"
	],
	"@stylistic/generator-star-spacing": [
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
	"@stylistic/indent": [
		"error",
		"tab",
		{
			"SwitchCase": 1
		}
	],
	"@stylistic/jsx-quotes": [
		"error",
		"prefer-double"
	],
	"@stylistic/linebreak-style": [
		"error",
		"unix"
	],
	"@stylistic/line-comment-position": [
		"error",
		{
			"position": "above"
		}
	],
	"@stylistic/max-len": [
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
	"@stylistic/max-statements-per-line": [
		"error",
		{
			"max": 1
		}
	],
	"@stylistic/multiline-ternary": [
		"error",
		"always-multiline"
	],
	"@stylistic/new-parens": [
		"error",
		"always"
	],
	"@stylistic/newline-per-chained-call": [
		"error",
		{
			/*"consistent": true,*/
			"ignoreChainWithDepth": 3
		}
	],
	"@stylistic/no-floating-decimal": "error",
	"@stylistic/no-mixed-spaces-and-tabs": [
		"error",
		"smart-tabs"
	],
	"@stylistic/no-multi-spaces": [
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
	"@stylistic/no-multiple-empty-lines": [
		"error",
		{
			"max": 1,
			"maxBOF": 0,
			"maxEOF": 1
		}
	],
	"@stylistic/no-tabs": [
		"error",
		{
			"allowIndentationTabs": true
		}
	],
	"@stylistic/no-trailing-spaces": [
		"error",
		{
			"skipBlankLines": false,
			"ignoreComments": false
		}
	],
	"@stylistic/no-whitespace-before-property": "error",
	"@stylistic/object-curly-newline": [
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
	"@stylistic/object-property-newline": [
		"error",
		{
			"allowAllPropertiesOnSameLine": true
		}
	],
	"@stylistic/operator-linebreak": [
		"error",
		"before"
	],
	"@stylistic/padded-blocks": [
		"error",
		"never"
	],
	"@stylistic/rest-spread-spacing": [
		"error",
		"never"
	],
	"@stylistic/semi-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@stylistic/semi-style": [
		"error",
		"last"
	],
	"@stylistic/space-in-parens": [
		"error",
		"never"
	],
	"@stylistic/space-unary-ops": [
		"error",
		{
			"words": true,
			"nonwords": false
		}
	],
	"@stylistic/spaced-comment": [
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
	"@stylistic/switch-colon-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@stylistic/template-curly-spacing": [
		"error",
		"never"
	],
	"@stylistic/template-tag-spacing": [
		"error",
		"never"
	],
	"@stylistic/wrap-iife": [
		"error",
		"inside",
		{
			"functionPrototypeMethods": true
		}
	],
	"@stylistic/yield-star-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@stylistic/block-spacing": [
		// Possibly unnecessary
		"error",
		"always"
	],
	"@stylistic/brace-style": [
		"error",
		"allman",
		{
			"allowSingleLine": true
		}
	],
	"@stylistic/comma-dangle": [
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
	"@stylistic/comma-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@stylistic/function-call-spacing": [
		"error",
		"never"
	],
	"@stylistic/indent": "off", // Bugged
	"@stylistic/key-spacing": [
		"error",
		{
			"beforeColon": false,
			"afterColon": true,
			"mode": "strict"
		}
	],
	"@stylistic/keyword-spacing": [
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
	"@stylistic/lines-between-class-members": [
		"error",
		"always",
		{
			"exceptAfterOverload": true,
			"exceptAfterSingleLine": true
		}
	],
	"@stylistic/member-delimiter-style": [
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
	"@stylistic/no-extra-parens": [
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
	"@stylistic/no-extra-semi": "error",
	"@stylistic/object-curly-spacing": [
		"error",
		"always",
		{
			"arraysInObjects": true,
			"objectsInObjects": true
		}
	],
	"@stylistic/padding-line-between-statements": [
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
	"@stylistic/quote-props": [
		"error",
		"consistent-as-needed"
	],
	"@stylistic/quotes": [
		"error",
		"double",
		{
			"avoidEscape": true,
			"allowTemplateLiterals": false
		}
	],
	"@stylistic/semi": [
		"error",
		"always",
		{
			"omitLastInOneLineBlock": false,
			"omitLastInOneLineClassBody": false
		}
	],
	"@stylistic/space-before-blocks": [
		// Possibly unnecessary
		"error",
		"always"
	],
	"@stylistic/space-before-function-paren": [
		"error",
		{
			"anonymous": "never",
			"named": "never",
			"asyncArrow": "always"
		}
	],
	"@stylistic/space-infix-ops": [
		"error",
		{
			"int32Hint": false
		}
	],
	"@stylistic/type-annotation-spacing": [
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
	"@typescript/adjacent-overload-signatures": "error",
	"@typescript/class-literal-property-style": [
		"error",
		"fields"
	],
	"@typescript/consistent-indexed-object-style": [
		"error",
		"record"
	],
	"@typescript/consistent-type-definitions": [
		"error",
		"interface"
	],
	"@typescript/dot-notation": [
		"error",
		{
			"allowKeywords": true,
			/*"allowPattern": undefined,*/
			"allowPrivateClassPropertyAccess": false,
			"allowProtectedClassPropertyAccess": false,
			"allowIndexSignaturePropertyAccess": true
		}
	],
	"@typescript/member-ordering": [
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
	"@typescript/method-signature-style": [
		"error",
		"property"
	],
	"@typescript/prefer-for-of": "error",
	"@typescript/prefer-function-type": "error",
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
