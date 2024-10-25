# Execution Context

## Introduction

A central aspect of Architectura is the `ExecutionContext` class.

A single server can process multiple requests at once in parallel, and managing shared ressources can risk contaminating the processing of other requests.
Each execution context instance is intimately bound to the execution stack to prevent cross contamination. It allows the centralized handling of ressources per request.
Architectura instantiate a new execution context, bound it to the current execution stack, then provide it to the endpoint and hooks.

From this execution context, you can retrieve the request and response objects.
It's also helpful for handling contextual items, like an instance of JWT or Session (see [Authentication](./authentication.md)).

## Getting the execution context

It is provided as the first argument of the `execute` methods of endpoints and hooks.

If you need it elsewhere, you do not need to pass it around, making a mess of your code, as you can retrieve the current execution context from anywhere.
```ts
import { type ExecutionContext, ExecutionContextRegistry } from "@vitruvius-labs/architectura";

const MY_CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext();
```
