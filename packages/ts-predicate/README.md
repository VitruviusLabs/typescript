# ts-predicate

## Philosophy

We want this lib to provide a strong foundation for your projects with tools that
follow the strictest standards.

1. This lib is entirely dependency free on purpose to avoid bitter surprises.
2. All the provided functions are "pure": deterministic, stateless, and side-effect free.
3. The code is tested exhaustively for maximum coverage by unit tests and mutation tests.

## Presentation

This lib is primarily about validating incoming data with the use
of the `isStructuredData()` functions. These functions enforce complete
validation of the data based on the expected type.

The type is the source of truth and the validation follow from the type, not the other way.

The lib also provide several functions to help both in building
`isStructuredData()` descriptor and to discriminate types in your own code.

Because `NaN` is usually an undesirable value, this lib assimilate `NaN` to a
nullish value along with `undefined` and `null`.

`JSON.stringify()` converts `NaN` into `null`.

## Getting started

Choose your favourite package manager.

```bash
pnpm add @vitruvius-lab/ts-predicate
```

```bash
yarn add @vitruvius-lab/ts-predicate
```

```
npm install @vitruvius-lab/ts-predicate
```

## Documentation

- [TypeAssertion](docs/TypeAssertion.md)
- [TypeGuard](docs/TypeGuard.md)
- [TypeHint](docs/TypeHint.md)
- [Helper](docs/Helper.md)
