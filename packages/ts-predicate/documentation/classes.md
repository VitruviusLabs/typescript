# ValidationError

To distinguish between unexpected errors and validation errors, you can check that the caught error is an instance of `ValidationError`.

Any custom assertion must throw a `ValidationError` unless an unexpected error occurred.

# UnknownError

When a provided callable throws anything but an instance of `Error`, an instance of `UnknownError` will be created.

You can get the original thrown value from the `reason` property.

# Validator

A wrapper class to enhance your type assertion functions.

## Constructor

The constructor takes a single parameter, a type assertion function of your choice.

```ts
const validator: Validator<MyType> = new Validator(assertMyType)
```

## Validator.assert()

Perform a type assertion check.

```ts
validator.assert(my_value);
```

## Validator.guard()

Perform a type guard check.

```ts
if (validator.guard(my_value)) {}
```

## Validator.validate()

Return a `ValidationError` or undefined.

```ts
const error: ValidationError | undefined = validator.validate(my_value);
```

## Validator.evaluate()

Return a `ValidationResult`.

```ts
const result: ValidationResult<MyType> = validator.evaluate(my_value);
```

# ValidationResult

## ValidationResult.onSuccess

The callable will be called if the evaluation was a success.

```ts
result.onSuccess((value: MyType): void => {});
```

## ValidationResult.onFailure

The callable will be called if the evaluation was a failure.

```ts
result.onFailure((error: ValidationError): void => {});
```

## Thenable

The instance is a thenable and can be awaited.

```ts
const value: MyType = await result;
```
