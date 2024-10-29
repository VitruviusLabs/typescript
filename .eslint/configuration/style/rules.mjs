const RULES = {
	"@style/array-bracket-newline": [
		"error",
		"consistent"
		// unsupported combination
		/*
		{
			"consistent": true,
			"multiline": true
		}
		*/
	],
	"@style/array-bracket-spacing": [
		"error",
		"never",
		{
			"singleValue": false,
			"objectsInArrays": false,
			"arraysInArrays": false
		}
	],
	"@style/array-element-newline": [
		"error",
		{
			"consistent": true,
			"multiline": true
		}
	],
	"@style/arrow-parens": [
		"error",
		"always"
	],
	"@style/arrow-spacing": [
		"error",
		{
			"before": true,
			"after": true
		}
	],
	"@style/comma-style": [
		"error",
		"last"
	],
	"@style/computed-property-spacing": [
		"error",
		"never"
	],
	"@style/curly-newline": [
		"error",
		{
			"multiline": true,
			"minElements": 1,
			"consistent": true,
		}
	],
	"@style/dot-location": [
		"error",
		"property"
	],
	"@style/eol-last": [
		"error",
		"always"
	],
	"@style/function-call-argument-newline": [
		"error",
		"consistent"
	],
	"@style/func-call-spacing": [
		"error",
		"never"
	],
	"@style/function-paren-newline": [
		"error",
		"multiline-arguments"
	],
	"@style/generator-star-spacing": [
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
	"@style/jsx-quotes": [
		"error",
		"prefer-double"
	],
	"@style/linebreak-style": [
		"error",
		"unix"
	],
	"@style/line-comment-position": [
		"error",
		{
			"position": "above"
		}
	],
	"@style/max-len": [
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
	"@style/max-statements-per-line": [
		"error",
		{
			"max": 1
		}
	],
	"@style/multiline-ternary": [
		"error",
		"always-multiline"
	],
	"@style/new-parens": [
		"error",
		"always"
	],
	"@style/newline-per-chained-call": [
		"error",
		{
			/*"consistent": true,*/
			"ignoreChainWithDepth": 3
		}
	],
	"@style/no-floating-decimal": "error",
	"@style/no-mixed-spaces-and-tabs": [
		"error",
		"smart-tabs"
	],
	"@style/no-multi-spaces": [
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
	"@style/no-multiple-empty-lines": [
		"error",
		{
			"max": 1,
			"maxBOF": 0,
			"maxEOF": 1
		}
	],
	"@style/no-tabs": [
		"error",
		{
			"allowIndentationTabs": true
		}
	],
	"@style/no-trailing-spaces": [
		"error",
		{
			"skipBlankLines": false,
			"ignoreComments": false
		}
	],
	"@style/no-whitespace-before-property": "error",
	"@style/object-curly-newline": [
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
	"@style/object-property-newline": [
		"error",
		{
			"allowAllPropertiesOnSameLine": true
		}
	],
	"@style/operator-linebreak": [
		"error",
		"before"
	],
	"@style/padded-blocks": [
		"error",
		"never"
	],
	"@style/rest-spread-spacing": [
		"error",
		"never"
	],
	"@style/semi-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@style/semi-style": [
		"error",
		"last"
	],
	"@style/space-in-parens": [
		"error",
		"never"
	],
	"@style/space-unary-ops": [
		"error",
		{
			"words": true,
			"nonwords": false
		}
	],
	"@style/spaced-comment": [
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
	"@style/switch-colon-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@style/template-curly-spacing": [
		"error",
		"never"
	],
	"@style/template-tag-spacing": [
		"error",
		"never"
	],
	"@style/wrap-iife": [
		"error",
		"inside",
		{
			"functionPrototypeMethods": true
		}
	],
	"@style/yield-star-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@style/block-spacing": [
		// Possibly unnecessary
		"error",
		"always"
	],
	"@style/brace-style": [
		"error",
		"allman",
		{
			"allowSingleLine": true
		}
	],
	"@style/comma-dangle": [
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
	"@style/comma-spacing": [
		"error",
		{
			"before": false,
			"after": true
		}
	],
	"@style/function-call-spacing": [
		"error",
		"never"
	],
	"@style/implicit-arrow-linebreak": [
		"error",
		"beside"
	],
	"@style/key-spacing": [
		"error",
		{
			"beforeColon": false,
			"afterColon": true,
			"mode": "strict"
		}
	],
	"@style/keyword-spacing": [
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
	"@style/lines-between-class-members": [
		"error",
		"always",
		{
			"exceptAfterOverload": true,
			"exceptAfterSingleLine": true
		}
	],
	"@style/member-delimiter-style": [
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
	"@style/no-extra-parens": [
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
	"@style/no-extra-semi": "error",
	"@style/object-curly-spacing": [
		"error",
		"always",
		{
			"arraysInObjects": true,
			"objectsInObjects": true
		}
	],
	"@style/padding-line-between-statements": [
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
	"@style/quote-props": [
		"error",
		"consistent-as-needed"
	],
	"@style/quotes": [
		"error",
		"double",
		{
			"avoidEscape": true,
			"allowTemplateLiterals": false
		}
	],
	"@style/semi": [
		"error",
		"always",
		{
			"omitLastInOneLineBlock": false,
			"omitLastInOneLineClassBody": false
		}
	],
	"@style/space-before-blocks": [
		// Possibly unnecessary
		"error",
		"always"
	],
	"@style/space-before-function-paren": [
		"error",
		{
			"anonymous": "never",
			"named": "never",
			"asyncArrow": "always"
		}
	],
	"@style/space-infix-ops": [
		"error",
		{
			"int32Hint": false
		}
	],
	"@style/type-annotation-spacing": [
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
	"@style/type-named-tuple-spacing": "error",
	"@ts/adjacent-overload-signatures": "error",
	"@ts/class-literal-property-style": [
		"error",
		"fields"
	],
	"@ts/consistent-indexed-object-style": [
		"error",
		"record"
	],
	"@ts/consistent-type-definitions": [
		"error",
		"interface"
	],
	"@ts/dot-notation": [
		"error",
		{
			"allowKeywords": true,
			/*"allowPattern": undefined,*/
			"allowPrivateClassPropertyAccess": false,
			"allowProtectedClassPropertyAccess": false,
			"allowIndexSignaturePropertyAccess": true
		}
	],
	"@ts/member-ordering": [
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
	"@ts/method-signature-style": [
		"error",
		"property"
	],
	"@ts/prefer-for-of": "error",
	"@ts/prefer-function-type": "error",
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
