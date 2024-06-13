/** @type { import("typescript-eslint").ConfigWithExtends["rules"] } */
const RULES = {
	"@typescript-eslint/array-type": [
		"error",
		{
			"default": "generic",
			"readonly": "generic"
		}
	],
	"@typescript-eslint/await-thenable": "error",
	"@typescript-eslint/ban-ts-comment": [
		"error",
		{
			"ts-expect-error": "allow-with-description",
			"ts-ignore": "allow-with-description",
			"ts-nocheck": false,
			"ts-check": false,
			"minimumDescriptionLength": 10
		}
	],
	"@typescript-eslint/ban-tslint-comment": "error",
	"@typescript-eslint/ban-types": [
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
	"@typescript-eslint/class-methods-use-this": [
		"error",
		{
			"enforceForClassFields": true,
			"ignoreOverrideMethods": true,
			"ignoreClassesThatImplementAnInterface": "public-fields",
			"exceptMethods": []
		}
	],
	"@typescript-eslint/consistent-generic-constructors": [
		"error",
		"type-annotation"
	],
	"@typescript-eslint/consistent-type-assertions": [
		"error",
		{
			"assertionStyle": "as",
			"objectLiteralTypeAssertions": "never"
		}
	],
	"@typescript-eslint/consistent-type-exports": [
		"error",
		{
			"fixMixedExportsWithInlineTypeSpecifier": true
		}
	],
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			"prefer": "type-imports",
			"fixStyle": "inline-type-imports",
			"disallowTypeAnnotations": true
		}
	],
	"@typescript-eslint/default-param-last": "error",
	"@typescript-eslint/explicit-function-return-type": [
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
	"@typescript-eslint/explicit-member-accessibility": [
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
	"@typescript-eslint/explicit-module-boundary-types": [
		"error",
		{
			"allowArgumentsExplicitlyTypedAsAny": false,
			"allowDirectConstAssertionInArrowFunctions": false,
			"allowHigherOrderFunctions": false,
			"allowTypedFunctionExpressions": false,
			"allowedNames": []
		}
	],
	"@typescript-eslint/init-declarations": [
		"error",
		"always"
	],
	"@typescript-eslint/max-params": [
		"error",
		{
			"max": 3
		}
	],
	"@typescript-eslint/no-array-constructor": "error",
	"@typescript-eslint/no-array-delete": "error",
	"@typescript-eslint/no-base-to-string": "error",
	"@typescript-eslint/no-confusing-non-null-assertion": "error",
	"@typescript-eslint/no-confusing-void-expression": [
		"error",
		{
			"ignoreArrowShorthand": false,
			"ignoreVoidOperator": false
		}
	],
	"@typescript-eslint/no-duplicate-enum-values": "error",
	"@typescript-eslint/no-duplicate-type-constituents": [
		"error",
		{
			"ignoreIntersections": false,
			"ignoreUnions": false
		}
	],
	"@typescript-eslint/no-dynamic-delete": "error",
	"@typescript-eslint/no-empty-function": [
		"error",
		{
			"allow": [
				"private-constructors",
				"protected-constructors",
				"decoratedFunctions"
			]
		}
	],
	"@typescript-eslint/no-empty-interface": [
		"error",
		{
			"allowSingleExtends": true
		}
	],
	"@typescript-eslint/no-explicit-any": [
		"error",
		{
			"fixToUnknown": true,
			"ignoreRestArgs": false
		}
	],
	"@typescript-eslint/no-extra-non-null-assertion": "error",
	"@typescript-eslint/no-extraneous-class": [
		"error",
		{
			"allowConstructorOnly": false,
			"allowEmpty": false,
			"allowStaticOnly": true,
			"allowWithDecorator": false
		}
	],
	"@typescript-eslint/no-floating-promises": [
		"error",
		{
			"ignoreIIFE": false,
			"ignoreVoid": false
		}
	],
	"@typescript-eslint/no-for-in-array": "error",
	"@typescript-eslint/no-implied-eval": "error",
	"@typescript-eslint/no-import-type-side-effects": "error",
	"@typescript-eslint/no-invalid-void-type": [
		"error",
		{
			"allowAsThisParameter": true,
			"allowInGenericTypeArguments": [
				"Promise",
				"Generator"
			]
		}
	],
	"@typescript-eslint/no-loop-func": "error",
	"@typescript-eslint/no-loss-of-precision": "error",
	"@typescript-eslint/no-magic-numbers": [
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
	"@typescript-eslint/no-meaningless-void-operator": [
		"error",
		{
			"checkNever": true
		}
	],
	"@typescript-eslint/no-misused-new": "error",
	"@typescript-eslint/no-misused-promises": [
		"error",
		{
			"checksConditionals": true,
			"checksVoidReturn": true,
			"checksSpreads": true
		}
	],
	"@typescript-eslint/no-namespace": [
		"error",
		{
			"allowDeclarations": false,
			"allowDefinitionFiles": false
		}
	],
	"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
	"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
	"@typescript-eslint/no-non-null-assertion": "error",
	"@typescript-eslint/no-redundant-type-constituents": "error",
	"@typescript-eslint/no-require-imports": "error",
	"@typescript-eslint/no-shadow": [
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
	"@typescript-eslint/no-this-alias": [
		"error",
		{
			"allowDestructuring": false,
			"allowedNames": []
		}
	],
	"@typescript-eslint/no-throw-literal": [
		"error",
		{
			"allowThrowingAny": false,
			"allowThrowingUnknown": false
		}
	],
	"@typescript-eslint/no-unnecessary-boolean-literal-compare": [
		"error",
		{
			"allowComparingNullableBooleansToTrue": false,
			"allowComparingNullableBooleansToFalse": false
		}
	],
	"@typescript-eslint/no-unnecessary-condition": [
		"error",
		{
			"allowConstantLoopConditions": false,
			"allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing": false
		}
	],
	"@typescript-eslint/no-unnecessary-type-assertion": "error",
	"@typescript-eslint/no-unnecessary-type-constraint": "error",
	"@typescript-eslint/no-unsafe-argument": "error",
	"@typescript-eslint/no-unsafe-assignment": "error",
	"@typescript-eslint/no-unsafe-call": "error",
	"@typescript-eslint/no-unsafe-declaration-merging": "error",
	"@typescript-eslint/no-unsafe-member-access": "error",
	"@typescript-eslint/no-unsafe-return": "error",
	"@typescript-eslint/no-unsafe-unary-minus": "error",
	"@typescript-eslint/no-unused-expressions": [
		"error",
		{
			"allowShortCircuit": false,
			"allowTernary": false,
			"allowTaggedTemplates": false,
			"enforceForJSX": true
		}
	],
	"@typescript-eslint/no-unused-vars": [
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
	"@typescript-eslint/no-use-before-define": [
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
	"@typescript-eslint/no-useless-constructor": "error",
	"@typescript-eslint/no-useless-empty-export": "error",
	"@typescript-eslint/no-useless-template-literals": "error",
	"@typescript-eslint/no-var-requires": "error",
	"@typescript-eslint/parameter-properties": [
		"error",
		{
			"prefer": "class-property",
			"allow": []
		}
	],
	"@typescript-eslint/prefer-as-const": "error",
	"@typescript-eslint/prefer-enum-initializers": "error",
	"@typescript-eslint/prefer-find": "error",
	"@typescript-eslint/prefer-includes": "error",
	"@typescript-eslint/prefer-literal-enum-member": [
		"error",
		{
			"allowBitwiseExpressions": false
		}
	],
	"@typescript-eslint/prefer-nullish-coalescing": [
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
	"@typescript-eslint/prefer-optional-chain": [
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
	"@typescript-eslint/prefer-promise-reject-errors": [
		"error",
		{
			"allowEmptyReject": false
		}
	],
	"@typescript-eslint/prefer-readonly": [
		"error",
		{
			"onlyInlineLambdas": false
		}
	],
	"@typescript-eslint/prefer-regexp-exec": "error",
	"@typescript-eslint/prefer-return-this-type": "error",
	"@typescript-eslint/prefer-string-starts-ends-with": "error",
	"@typescript-eslint/prefer-ts-expect-error": "error",
	"@typescript-eslint/promise-function-async": [
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
	"@typescript-eslint/require-array-sort-compare": [
		"error",
		{
			"ignoreStringArrays": false
		}
	],
	"@typescript-eslint/require-await": "error",
	"@typescript-eslint/restrict-plus-operands": [
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
	"@typescript-eslint/restrict-template-expressions": [
		"error",
		{
			"allowAny": false,
			"allowBoolean": false,
			"allowNullish": false,
			"allowNumber": false,
			"allowRegExp": false
		}
	],
	"@typescript-eslint/return-await": [
		"error",
		"always"
	],
	"@typescript-eslint/strict-boolean-expressions": [
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
	"@typescript-eslint/switch-exhaustiveness-check": [
		"error",
		{
			"allowDefaultCaseForExhaustiveSwitch": false,
			"requireDefaultForNonUnion": false
		}
	],
	"@typescript-eslint/triple-slash-reference": [
		"error",
		{
			"lib": "never",
			"path": "never",
			"types": "never"
		}
	],
	"@typescript-eslint/typedef": [
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
	"@typescript-eslint/unbound-method": [
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
	"no-new-symbol": "error",
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
