const RULES = {
	"@ts/array-type": [
		"error",
		{
			"default": "generic",
			"readonly": "generic"
		}
	],
	"@ts/await-thenable": "error",
	"@ts/ban-ts-comment": [
		"error",
		{
			"ts-expect-error": "allow-with-description",
			"ts-ignore": false,
			"ts-nocheck": false,
			"ts-check": false,
			"minimumDescriptionLength": 10
		}
	],
	"@ts/ban-tslint-comment": "error",
	"@ts/ban-types": [
		"error",
		{
			"types": {
				"Boolean": {
					"message": "Use boolean instead",
					"fixWith": "boolean"
				},
				"Number": {
					"message": "Use number instead",
					"fixWith": "number"
				},
				"BigInt": {
					"message": "Use bigint instead",
					"fixWith": "bigint"
				},
				"String": {
					"message": "Use string instead",
					"fixWith": "string"
				},
				"Symbol": {
					"message": "Use symbol instead",
					"fixWith": "symbol"
				},
				"Function": {
					"message": "Use an arrow function or a constructor instead",
					"suggest": [
						"() => void",
						"new () => void"
					]
				},
				"Object": {
					"message": "Use object, a Record, a class, or an interface instead",
					"suggest": [
						"object",
						"Record<string, unknown>"
					]
				},
				"{}": {
					"message": "Use type object if you mean any object value, or use a more precise type",
					"suggest": [
						"unknown",
						"object",
						"Record<string, unknown>"
					]
				}
			}
		}
	],
	"@ts/consistent-generic-constructors": [
		"error",
		"type-annotation"
	],
	"@ts/consistent-type-assertions": [
		"error",
		{
			"assertionStyle": "as",
			"objectLiteralTypeAssertions": "never"
		}
	],
	"@ts/consistent-type-exports": [
		"error",
		{
			"fixMixedExportsWithInlineTypeSpecifier": true
		}
	],
	"@ts/consistent-type-imports": [
		"error",
		{
			"prefer": "type-imports",
			"fixStyle": "inline-type-imports",
			"disallowTypeAnnotations": true
		}
	],
	"@ts/default-param-last": "error",
	"@ts/explicit-function-return-type": [
		"error",
		{
			"allowExpressions": false,
			"allowTypedFunctionExpressions": false,
			"allowHigherOrderFunctions": true,
			"allowDirectConstAssertionInArrowFunctions": false,
			"allowConciseArrowFunctionExpressionsStartingWithVoid": false,
			"allowFunctionsWithoutTypeParameters": false,
			"allowedNames": [],
			"allowIIFEs": false
		}
	],
	"@ts/explicit-member-accessibility": [
		"error",
		{
			"accessibility": "explicit",
			"ignoredMethodNames": [],
			"overrides": {
				"accessors": "explicit",
				"constructors": "explicit",
				"methods": "explicit",
				"parameterProperties": "explicit",
				"properties": "explicit"
			}
		}
	],
	"@ts/explicit-module-boundary-types": [
		"error",
		{
			"allowArgumentsExplicitlyTypedAsAny": false,
			"allowDirectConstAssertionInArrowFunctions": false,
			"allowHigherOrderFunctions": false,
			"allowTypedFunctionExpressions": false,
			"allowedNames": []
		}
	],
	"@ts/init-declarations": [
		"error",
		"always"
	],
	"@ts/max-params": [
		"error",
		{
			"max": 3
		}
	],
	"@ts/no-array-constructor": "error",
	"@ts/no-array-delete": "error",
	"@ts/no-base-to-string": "error",
	"@ts/no-confusing-non-null-assertion": "error",
	"@ts/no-confusing-void-expression": [
		"error",
		{
			"ignoreArrowShorthand": false,
			"ignoreVoidOperator": false
		}
	],
	"@ts/no-duplicate-enum-values": "error",
	"@ts/no-duplicate-type-constituents": [
		"error",
		{
			"ignoreIntersections": false,
			"ignoreUnions": false
		}
	],
	"@ts/no-dynamic-delete": "error",
	"@ts/no-empty-function": [
		"error",
		{
			"allow": [
				"private-constructors",
				"protected-constructors",
				"decoratedFunctions"
			]
		}
	],
	"@ts/no-empty-interface": [
		"error",
		{
			"allowSingleExtends": true
		}
	],
	"@ts/no-explicit-any": [
		"error",
		{
			"fixToUnknown": true,
			"ignoreRestArgs": false
		}
	],
	"@ts/no-extra-non-null-assertion": "error",
	"@ts/no-extraneous-class": [
		"error",
		{
			"allowConstructorOnly": false,
			"allowEmpty": false,
			"allowStaticOnly": true,
			"allowWithDecorator": false
		}
	],
	"@ts/no-floating-promises": [
		"error",
		{
			"ignoreIIFE": false,
			"ignoreVoid": false
		}
	],
	"@ts/no-for-in-array": "error",
	"@ts/no-implied-eval": "error",
	"@ts/no-import-type-side-effects": "error",
	"@ts/no-invalid-void-type": [
		"error",
		{
			"allowAsThisParameter": true,
			"allowInGenericTypeArguments": [
				"Promise",
				"Generator"
			]
		}
	],
	"@ts/no-loop-func": "error",
	"@ts/no-loss-of-precision": "error",
	"@ts/no-magic-numbers": [
		"error",
		{
			"enforceConst": true,
			"detectObjects": true,
			"ignoreArrayIndexes": false,
			"ignoreDefaultValues": false,
			"ignoreEnums": true,
			"ignoreNumericLiteralTypes": false,
			"ignoreReadonlyClassProperties": false,
			"ignoreClassFieldInitialValues": false,
			"ignoreTypeIndexes": false,
			"ignore": [
				0,
				1,
				-1
			]
		}
	],
	"@ts/no-meaningless-void-operator": [
		"error",
		{
			"checkNever": true
		}
	],
	"@ts/no-misused-new": "error",
	"@ts/no-misused-promises": [
		"error",
		{
			"checksConditionals": true,
			"checksVoidReturn": true,
			"checksSpreads": true
		}
	],
	"@ts/no-namespace": [
		"error",
		{
			"allowDeclarations": false,
			"allowDefinitionFiles": false
		}
	],
	"@ts/no-non-null-asserted-nullish-coalescing": "error",
	"@ts/no-non-null-asserted-optional-chain": "error",
	"@ts/no-non-null-assertion": "error",
	"@ts/no-redundant-type-constituents": "error",
	"@ts/no-require-imports": "error",
	"@ts/no-shadow": [
		"error",
		{
			"allow": [],
			"hoist": "all",
			"builtinGlobals": true,
			"ignoreOnInitialization": false,
			"ignoreTypeValueShadow": false,
			"ignoreFunctionTypeParameterNameValueShadow": false
		}
	],
	"@ts/no-this-alias": [
		"error",
		{
			"allowDestructuring": false,
			"allowedNames": []
		}
	],
	"@ts/no-unnecessary-boolean-literal-compare": [
		"error",
		{
			"allowComparingNullableBooleansToTrue": false,
			"allowComparingNullableBooleansToFalse": false
		}
	],
	"@ts/no-unnecessary-condition": [
		"error",
		{
			"allowConstantLoopConditions": false,
			"allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing": false
		}
	],
	"@ts/no-unnecessary-template-expression": "error",
	"@ts/no-unnecessary-type-assertion": "error",
	"@ts/no-unnecessary-type-constraint": "error",
	"@ts/no-unsafe-argument": "error",
	"@ts/no-unsafe-assignment": "error",
	"@ts/no-unsafe-call": "error",
	"@ts/no-unsafe-declaration-merging": "error",
	"@ts/no-unsafe-member-access": "error",
	"@ts/no-unsafe-return": "error",
	"@ts/no-unsafe-unary-minus": "error",
	"@ts/no-unused-expressions": [
		"error",
		{
			"allowShortCircuit": false,
			"allowTernary": false,
			"allowTaggedTemplates": false,
			"enforceForJSX": true
		}
	],
	"@ts/no-unused-vars": [
		"error",
		{
			"vars": "all",
			"args": "after-used",
			"caughtErrors": "all",
			"ignoreRestSiblings": false
			/* "varsIgnorePattern": undefined, */
			/* "argsIgnorePattern": undefined, */
		}
	],
	"@ts/no-use-before-define": [
		"error",
		{
			"functions": true,
			"classes": true,
			"variables": true,
			"enums": true,
			"typedefs": true,
			"ignoreTypeReferences": false,
			"allowNamedExports": false
		}
	],
	"@ts/no-useless-constructor": "error",
	"@ts/no-useless-empty-export": "error",
	"@ts/no-var-requires": "error",
	"@ts/only-throw-error": [
		"error",
		{
			"allowThrowingAny": false,
			"allowThrowingUnknown": false
		}
	],
	"@ts/parameter-properties": [
		"error",
		{
			"prefer": "class-property",
			"allow": []
		}
	],
	"@ts/prefer-as-const": "error",
	"@ts/prefer-enum-initializers": "error",
	"@ts/prefer-find": "error",
	"@ts/prefer-includes": "error",
	"@ts/prefer-literal-enum-member": [
		"error",
		{
			"allowBitwiseExpressions": false
		}
	],
	"@ts/prefer-nullish-coalescing": [
		"error",
		{
			"ignoreTernaryTests": false,
			"ignoreConditionalTests": false,
			"ignoreMixedLogicalExpressions": false,
			"ignorePrimitives": {
				"bigint": false,
				"boolean": false,
				"number": false,
				"string": false
			},
			"allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing": false
		}
	],
	"@ts/prefer-optional-chain": [
		"error",
		{
			"checkAny": true,
			"checkUnknown": true,
			"checkString": true,
			"checkNumber": true,
			"checkBoolean": true,
			"checkBigInt": true,
			"requireNullish": true,
			"allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing": false
		}
	],
	"@ts/prefer-promise-reject-errors": [
		"error",
		{
			"allowEmptyReject": false
		}
	],
	"@ts/prefer-readonly": [
		"error",
		{
			"onlyInlineLambdas": false
		}
	],
	"@ts/prefer-regexp-exec": "error",
	"@ts/prefer-return-this-type": "error",
	"@ts/prefer-string-starts-ends-with": "error",
	"@ts/promise-function-async": [
		"error",
		{
			"allowAny": true,
			"allowedPromiseNames": [],
			"checkArrowFunctions": true,
			"checkFunctionDeclarations": true,
			"checkFunctionExpressions": true,
			"checkMethodDeclarations": true
		}
	],
	"@ts/require-array-sort-compare": [
		"error",
		{
			"ignoreStringArrays": false
		}
	],
	"@ts/require-await": "error",
	"@ts/restrict-plus-operands": [
		"error",
		{
			"allowAny": false,
			"allowBoolean": false,
			"allowNullish": false,
			"allowRegExp": false,
			"allowNumberAndString": false,
			"skipCompoundAssignments": false
		}
	],
	"@ts/restrict-template-expressions": [
		"error",
		{
			"allowAny": false,
			"allowBoolean": false,
			"allowNullish": false,
			"allowNumber": false,
			"allowRegExp": false
		}
	],
	"@ts/return-await": [
		"error",
		"always"
	],
	"@ts/strict-boolean-expressions": [
		"error",
		{
			"allowString": false,
			"allowNumber": false,
			"allowNullableObject": false,
			"allowNullableBoolean": false,
			"allowNullableString": false,
			"allowNullableNumber": false,
			"allowNullableEnum": false,
			"allowAny": false,
			"allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing": false
		}
	],
	"@ts/switch-exhaustiveness-check": [
		"error",
		{
			"allowDefaultCaseForExhaustiveSwitch": false,
			"requireDefaultForNonUnion": false
		}
	],
	"@ts/triple-slash-reference": [
		"error",
		{
			"lib": "never",
			"path": "never",
			"types": "never"
		}
	],
	"@ts/typedef": [
		"error",
		{
			"arrayDestructuring": true,
			"arrowParameter": true,
			"memberVariableDeclaration": true,
			"objectDestructuring": true,
			"parameter": true,
			"propertyDeclaration": true,
			"variableDeclaration": true,
			"variableDeclarationIgnoreFunction": true
		}
	],
	"@ts/unbound-method": [
		"error",
		{
			"ignoreStatic": false
		}
	],
	"accessor-pairs": [
		"warn",
		{
			"setWithoutGet": true,
			"getWithoutSet": true,
			"enforceForClassMembers": true
		}
	],
	"array-callback-return": [
		"error",
		{
			"allowImplicit": false,
			"checkForEach": true,
			"allowVoid": false
		}
	],
	"complexity": [
		"error",
		{
			"max": 30
		}
	],
	"default-case-last": "error",
	"eqeqeq": [
		"error",
		"always",
		{
			"null": "ignore"
		}
	],
	"for-direction": "error",
	"func-style": [
		"error",
		"declaration",
		{
			"allowArrowFunctions": true
		}
	],
	"max-classes-per-file": [
		"error",
		{
			"max": 1,
			"ignoreExpressions": false
		}
	],
	"max-depth": [
		"error",
		{
			"max": 7
		}
	],
	"max-lines": [
		"error",
		{
			"max": 1000,
			"skipBlankLines": true,
			"skipComments": true
		}
	],
	"max-lines-per-function": [
		"error",
		{
			"max": 100,
			"skipBlankLines": true,
			"skipComments": true,
			"IIFEs": true
		}
	],
	"max-nested-callbacks": [
		"error",
		{
			"max": 4
		}
	],
	"max-statements": [
		"error",
		50,
		{
			"ignoreTopLevelFunctions": false
		}
	],
	"no-async-promise-executor": "error",
	"no-caller": "error",
	"no-case-declarations": "error",
	"no-class-assign": "error",
	"no-compare-neg-zero": "error",
	"no-cond-assign": [
		"error",
		"always"
	],
	"no-console": "warn",
	"no-constant-binary-expression": "error",
	"no-constant-condition": [
		"error",
		{
			"checkLoops": true
		}
	],
	"no-constructor-return": "error",
	"no-delete-var": "error",
	"no-dupe-else-if": "error",
	"no-duplicate-case": "error",
	"no-duplicate-imports": [
		"error",
		{
			"includeExports": true
		}
	],
	"no-else-return": [
		"error",
		{
			"allowElseIf": false
		}
	],
	"no-empty": [
		"error",
		{
			"allowEmptyCatch": false
		}
	],
	"no-empty-character-class": "error",
	"no-empty-pattern": [
		"error",
		{
			"allowObjectPatternsAsParameters": false
		}
	],
	"no-empty-static-block": "error",
	"no-eval": [
		"error",
		{
			"allowIndirect": false
		}
	],
	"no-ex-assign": "error",
	"no-extend-native": [
		"error",
		{
			"exceptions": []
		}
	],
	"no-extra-bind": "error",
	"no-extra-boolean-cast": [
		"error",
		{
			"enforceForLogicalOperands": true
		}
	],
	"no-fallthrough": [
		"error",
		{
			"allowEmptyCase": false,
			"commentPattern": "no break|break.*?omitted|falls? ?through"
		}
	],
	"no-global-assign": [
		"error",
		{
			"exceptions": []
		}
	],
	"no-implicit-coercion": [
		"error",
		{
			"boolean": true,
			"number": true,
			"string": true,
			"disallowTemplateShorthand": true,
			"allow": []
		}
	],
	"no-invalid-regexp": [
		"error",
		{
			"allowConstructorFlags": [
				"g",
				"i",
				"m",
				"u",
				"y",
				"s"
			]
		}
	],
	"no-irregular-whitespace": [
		"error",
		{
			"skipStrings": false,
			"skipComments": false,
			"skipRegExps": false,
			"skipTemplates": false,
			"skipJSXText": false
		}
	],
	"no-iterator": "error",
	"no-labels": [
		"error",
		{
			"allowLoop": false,
			"allowSwitch": false
		}
	],
	"no-lonely-if": "error",
	"no-multi-assign": [
		"error",
		{
			"ignoreNonDeclaration": false
		}
	],
	"no-multi-str": "error",
	"no-negated-condition": "error",
	"no-nested-ternary": "error",
	"no-new": "error",
	"no-new-func": "error",
	"no-new-native-nonconstructor": "error",
	"no-new-wrappers": "error",
	"no-nonoctal-decimal-escape": "error",
	"no-object-constructor": "error",
	"no-octal": "error",
	"no-octal-escape": "error",
	"no-param-reassign": [
		"error",
		{
			"props": false
		}
	],
	"no-promise-executor-return": [
		"error",
		{
			"allowVoid": false
		}
	],
	"no-proto": "error",
	"no-restricted-properties": [
		"error",
		{
			"property": "isPrototypeOf",
			"message": "Use instanceof instead"
		},
		{
			"property": "propertyIsEnumerable",
			"message": "Do not check property enumerability"
		}
	],
	"no-restricted-syntax": [
		"error",
		{
			"message": "IIFEs are not allowed",
			"selector": "CallExpression[callee.type=FunctionExpression]"
		},
		{
			"message": "IIFEs are not allowed",
			"selector": "CallExpression[callee.type=ArrowFunctionExpression]"
		}
	],
	"no-return-assign": [
		"error",
		"always"
	],
	"no-script-url": "error",
	"no-self-assign": [
		"error",
		{
			"props": true
		}
	],
	"no-self-compare": "error",
	"no-sequences": [
		"error",
		{
			"allowInParentheses": false
		}
	],
	"no-shadow-restricted-names": "error",
	"no-sparse-arrays": "error",
	"no-template-curly-in-string": "error",
	"no-underscore-dangle": [
		"error",
		{
			"allow": [],
			"allowAfterThis": true,
			"allowAfterSuper": false,
			"allowAfterThisConstructor": true,
			"enforceInMethodNames": true,
			"enforceInClassFields": true,
			"allowInArrayDestructuring": false,
			"allowInObjectDestructuring": false,
			"allowFunctionParams": false
		}
	],
	"no-unexpected-multiline": "error",
	"no-unmodified-loop-condition": "error",
	"no-unneeded-ternary": [
		"error",
		{
			"defaultAssignment": false
		}
	],
	"no-unreachable-loop": [
		"error",
		{
			"ignore": []
		}
	],
	"no-unsafe-finally": "error",
	"no-unsafe-optional-chaining": [
		"error",
		{
			"disallowArithmeticOperators": true
		}
	],
	"no-unused-private-class-members": "error",
	"no-useless-backreference": "error",
	"no-useless-call": "error",
	"no-useless-catch": "error",
	"no-useless-concat": "error",
	"no-useless-escape": "error",
	"no-useless-rename": [
		"error",
		{
			"ignoreDestructuring": false,
			"ignoreImport": false,
			"ignoreExport": false
		}
	],
	"no-useless-return": "error",
	"no-var": "error",
	"no-void": [
		"error",
		{
			"allowAsStatement": false
		}
	],
	"no-warning-comments": [
		"warn",
		{
			"terms": [
				"TODO",
				"FIXME"
			],
			"location": "anywhere"
		}
	],
	"no-with": "error",
	"object-shorthand": [
		"error",
		"consistent"
	],
	"one-var": [
		"error",
		"never"
	],
	"prefer-arrow-callback": [
		"error",
		{
			"allowNamedFunctions": false,
			"allowUnboundThis": false
		}
	],
	"prefer-const": [
		"error",
		{
			"destructuring": "any",
			"ignoreReadBeforeAssign": true
		}
	],
	"prefer-named-capture-group": "error",
	"prefer-numeric-literals": "error",
	"prefer-object-has-own": "error",
	"prefer-object-spread": "error",
	"prefer-regex-literals": [
		"error",
		{
			"disallowRedundantWrapping": true
		}
	],
	"prefer-rest-params": "error",
	"prefer-spread": "error",
	"prefer-template": "error",
	"radix": [
		"error",
		"always"
	],
	"require-atomic-updates": [
		"error",
		{
			"allowProperties": false
		}
	],
	"require-yield": "error",
	"unicode-bom": [
		"error",
		"never"
	],
	"strict": [
		"error",
		"never"
	],
	"symbol-description": "error",
};

export { RULES as rules };
