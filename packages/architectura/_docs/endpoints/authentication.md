# Authentication

## JWT

Architectura provide natively the tools to handle JWTs.
It will process an `Authorization` header to extract a JWT.
The found JWT will be added to the execution context.

### Installation

Instantiate and register the pre-hook.

```ts
import { HookRegistry, JWTPreHook, type SecretType } from "@vitruvius-labs/architectura";

const MY_SECRET: SecretType = "...";

HookRegistry.addPreHook(new JWTPreHook(MY_SECRET));
```

### Retrieving the JWT

To retrieve the JWT from the execution context, do
```ts
import { JWT } from "@vitruvius-labs/architectura";

const MY_JWT: JWT = context.getContextualItem(JWT);
```

## Session

Architectura provide natively the tools to handle sessions using cookies.
It will process a cookie named `session_uuid`.
The found session will be added to the execution context.

### Installation

Instantiate and register the pre-hook.
The delegate handle the persistent storage of session data.

```ts
import { HookRegistry, SessionPreHook, type SessionDelegateInterface } from "@vitruvius-labs/architectura";

const MY_SESSION_DELEGATE: SessionDelegateInterface = { ... };

HookRegistry.addPreHook(new SessionPreHook(MY_SESSION_DELEGATE));
```

### Retrieving the session

To retrieve the session from the execution context, do
```ts
import { Session } from "@vitruvius-labs/architectura";

const MY_SESSION: Session = context.getContextualItem(Session);
```
