import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BasePreHook } from "../../base.pre-hook.mjs";
import type { BasePostHook } from "../../base.post-hook.mjs";
import type { BaseErrorHook } from "../../base.error-hook.mjs";

interface HooksInterface<T extends BasePreHook | BasePostHook | BaseErrorHook>
{
	global: Array<T | ConstructorOf<T>>;
	excluded: Array<ConstructorOf<T>>;
	local: Array<T | ConstructorOf<T>>;
}

export type { HooksInterface };
