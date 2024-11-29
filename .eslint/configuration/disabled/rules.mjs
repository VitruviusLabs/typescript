/*
 * List disabled rules to help with configuration inspection
 * It's easier to see the new rules in the unused rules list
**/
const RULES = {
	// Buggy rule
	"@style/indent": "off",
	// Buggy rule
	"@style/indent-binary-ops": "off",
	// We don't do JSX
	"@style/jsx-child-element-spacing": "off",
	// We don't do JSX
	"@style/jsx-closing-bracket-location": "off",
	// We don't do JSX
	"@style/jsx-closing-tag-location": "off",
	// We don't do JSX
	"@style/jsx-curly-brace-presence": "off",
	// We don't do JSX
	"@style/jsx-curly-newline": "off",
	// We don't do JSX
	"@style/jsx-curly-spacing": "off",
	// We don't do JSX
	"@style/jsx-equals-spacing": "off",
	// We don't do JSX
	"@style/jsx-first-prop-new-line": "off",
	// We don't do JSX
	"@style/jsx-function-call-newline": "off",
	// We don't do JSX
	"@style/jsx-indent-props": "off",
	// We don't do JSX
	"@style/jsx-max-props-per-line": "off",
	// We don't do JSX
	"@style/jsx-newline": "off",
	// We don't do JSX
	"@style/jsx-one-expression-per-line": "off",
	// We don't do JSX
	"@style/jsx-pascal-case": "off",
	// We don't do JSX
	"@style/jsx-props-no-multi-spaces": "off",
	// We don't do JSX
	"@style/jsx-self-closing-comp": "off",
	// We don't do JSX
	"@style/jsx-sort-props": "off",
	// We don't do JSX
	"@style/jsx-tag-spacing": "off",
	// We don't do JSX
	"@style/jsx-wrap-multilines": "off",
	// We don't do JSX
	"@style/wrap-regex": "off",
	// Free choice
	"@style/lines-around-comment": "off",
	// Case by case
	"@style/multiline-comment-style": "off",
	// The @ts/typedef rule make this rule obsolete
	"@style/no-confusing-arrow": "off",
	// Shouldn't be an issue with TypeScript
	"@style/no-mixed-operators": "off",
	// The curly rule make this rule obsolete
	"@style/nonblock-statement-body-position": "off",
	// The one-var rule make this rule obsolete
	"@style/one-var-declaration-per-line": "off",
	// The @style/comma-spacing rule make this rule obsolete
	"@style/type-generic-spacing": "off",
	// TypeScript prevent such confusion
	"@style/wrap-regexp": "off",
	// Handled by TypeScript option noImplicitReturns
	"@ts/consistent-return": "off",
	// Not formally defined
	"@ts/naming-convention": "off",
	// Handled by TypeScript
	"@ts/no-dupe-class-members": "off",
	// Incompatible with the @ts/typedef rule
	"@ts/no-inferrable-types": "off",
	// Handled by TypeScript option noImplicitThis
	"@ts/no-invalid-this": "off",
	// Mixed enums are good for holding configuration values
	"@ts/no-mixed-enums": "off",
	// Handled by TypeScript
	"@ts/no-redeclare": "off",
	// It was not necessary so far
	"@ts/no-restricted-imports": "off",
	// Not needed so far
	"@ts/no-restricted-types": "off",
	// The @ts/parameter-properties rule make this rule obsolete
	"@ts/no-unnecessary-parameter-property-assignment": "off",
	// Explicit qualifiers improve readability
	"@ts/no-unnecessary-qualifier": "off",
	// Being explicit is never bad
	"@ts/no-unnecessary-type-arguments": "off",
	// Being explicit is never bad
	"@ts/no-unnecessary-type-parameters": "off",
	// Enum comparison is necessary for comparing values with magic numbers or string constants
	"@ts/no-unsafe-enum-comparison": "off",
	// Type assertions are forbidden
	"@ts/no-unsafe-type-assertion": "error",
	// Traditional type assertion is more explicit
	"@ts/non-nullable-type-assertion-style": "off",
	// Destructuring is not always the best choice
	"@ts/prefer-destructuring": "off",
	// The @ts/no-namespace rule make this rule obsolete
	"@ts/prefer-namespace-keyword": "off",
	// Conflict with the no-param-reassign rule props option
	"@ts/prefer-readonly-parameter-types": "off",
	// The type is often implied by the callable return type
	"@ts/prefer-reduce-type-parameter": "off",
	// Distinct signatures can improve readability
	"@ts/unified-signatures": "off",
	// The no-var rule make this rule obsolete
	"block-scoped-var": "off",
	// Conflict with some dependencies and APIs
	"camelcase": "off",
	// Some comments may need to begin with a lowercase
	"capitalized-comments": "off",
	// Redefined as @ts/class-methods-use-this
	"class-methods-use-this": "off",
	// Redefined as @ts/consistent-return
	"consistent-return": "off",
	// The prefer-arrow-callback rule make this rule obsolete
	"consistent-this": "off",
	// Handled by TypeScript
	"constructor-super": "off",
	// Conflict with @ts/switch-exhaustiveness-check option allowDefaultCaseForExhaustiveSwitch
	"default-case": "off",
	// Redefined as @ts/default-param-last
	"default-param-last": "off",
	// Redefined as @ts/dot-notation
	"dot-notation": "off",
	// The prefer-arrow-callback rule make this rule obsolete
	"func-name-matching": "off",
	// Handled by TypeScript
	"getter-return": "off",
	// Handled by TypeScript
	"guard-for-in": "off",
	// The rules id-denylist and id-length make this rule obsolete
	"id-match": "off",
	// Redefined as @ts/init-declarations
	"init-declarations": "off",
	// Redefined as @ts/max-params
	"max-params": "off",
	// All variables follow the same naming convention
	"new-cap": "off",
	// The rule is only for a browser environment
	"no-alert": "off",
	// Redefined as @ts/no-array-constructor
	"no-array-constructor": "off",
	// It is not always desirable to perform multiple asynchronous operations in parallel
	"no-await-in-loop": "off",
	// Bitwise operations are useful in some cases
	"no-bitwise": "off",
	// Handled by TypeScript
	"no-const-assign": "off",
	// Early interruption improve readability
	"no-continue": "off",
	// Using ASCII or unicode code points in RegExp patterns is not bad
	"no-control-regex": "off",
	// TypeScript prevent such confusion
	"no-div-regex": "off",
	// Handled by TypeScript
	"no-dupe-args": "off",
	// Redefined as @ts/no-dupe-class-members
	"no-dupe-class-members": "off",
	// Handled by TypeScript
	"no-dupe-keys": "off",
	// Redefined as @ts/no-empty-function
	"no-empty-function": "off",
	// The eqeqeq rule make this rule obsolete
	"no-eq-null": "off",
	// The no-labels rule make this rule obsolete
	"no-extra-label": "off",
	// Handled by TypeScript
	"no-func-assign": "off",
	// Doesn't apply to modules
	"no-implicit-globals": "off",
	// Redefined as @ts/no-implied-eval
	"no-implied-eval": "off",
	// Handled by TypeScript
	"no-import-assign": "off",
	// Inline comments may improve readability in some cases
	"no-inline-comments": "off",
	// Not an issue in modules and strict mode
	"no-inner-declarations": "off",
	// Redefined as @ts/no-invalid-this
	"no-invalid-this": "off",
	// The no-labels rule make this rule obsolete
	"no-label-var": "off",
	// Not an issue in modules and strict mode
	"no-lone-blocks": "off",
	// Redefined as @ts/no-loop-func
	"no-loop-func": "off",
	// Redefined as @ts/no-magic-numbers
	"no-magic-numbers": "off",
	// Handled by TypeScript
	"no-obj-calls": "off",
	// Increment and decrement operators are good
	"no-plusplus": "off",
	// Redefined as @ts/no-redeclare
	"no-redeclare": "off",
	// The rules id-denylist and id-length are enough so far
	"no-restricted-exports": "off",
	// Not needed so far
	"no-restricted-globals": "off",
	// Redefined as @ts/no-restricted-imports
	"no-restricted-imports": "off",
	// Handled by TypeScript
	"no-setter-return": "off",
	// Redefined as @ts/no-shadow
	"no-shadow": "off",
	// Ternary can be useful in some cases
	"no-ternary": "off",
	// Handled by TypeScript
	"no-this-before-super": "off",
	// Redefined as @ts/only-throw-error
	"no-throw-literal": "off",
	// Handled by TypeScript
	"no-undef": "off",
	// Incompatible with @ts/init-declarations
	"no-undef-init": "off",
	// The no-shadow-restricted-names rule make this rule obsolete
	"no-undefined": "off",
	// Handled by TypeScript
	"no-unreachable": "off",
	// Handled by TypeScript
	"no-unsafe-negation": "off",
	// Redefined as @ts/no-unused-expressions
	"no-unused-expressions": "off",
	// The no-labels rule make this rule obsolete
	"no-unused-labels": "off",
	// Redefined as @ts/no-unused-vars
	"no-unused-vars": "off",
	// Redefined as @ts/no-use-before-define
	"no-use-before-define": "off",
	// Incompatible with @ts/init-declarations
	"no-useless-assignment": "off",
	// Redefined as @ts/no-useless-constructor
	"no-useless-constructor": "off",
	// Redefined as @ts/prefer-destructuring
	"prefer-destructuring": "off",
	// Math.pow() can improve readability
	"prefer-exponentiation-operator": "off",
	// Redefined as @ts/prefer-promise-reject-errors
	"prefer-promise-reject-errors": "off",
	// Redefined as @ts/require-await
	"require-await": "off",
	// Simple RegExp do not need the unicode flag
	"require-unicode-regexp": "off",
	// Grouping keys logically improve readability
	"sort-keys": "off",
	// The one-var rule make this rule obsolete
	"sort-vars": "off",
	// Handled by TypeScript
	"use-isnan": "off",
	// Handled by TypeScript
	"valid-typeof": "off",
	// The no-var rule make this rule obsolete
	"vars-on-top": "off",
};

export { RULES as rules };
